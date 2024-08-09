package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Dtos.ISOMessageDto;
import hsid.demo.HSID_Backend.Entities.ISOMessage;
import hsid.demo.HSID_Backend.Mappers.ISOMessageMapper;
import hsid.demo.HSID_Backend.Repository.ISOMessageRepository;
import hsid.demo.HSID_Backend.Service.ISOMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ISOMessageServiceImpl implements ISOMessageService {

    @Autowired
    private ISOMessageRepository isoMessageRepository;

    @Override
    public List<ISOMessageDto> getAllMessages() {
        return isoMessageRepository.findAll().stream()
                .map(ISOMessageMapper::mapToISOMessageDto)
                .collect(Collectors.toList());
    }

    @Override
    public ISOMessageDto getMessageById(Long id) {
        ISOMessage isoMessage = isoMessageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found"));
        return ISOMessageMapper.mapToISOMessageDto(isoMessage);
    }

    @Override
    public ISOMessageDto createMessage(ISOMessageDto isoMessageDto) {
        isoMessageDto.setDecodedMessage(decodeISOMessage(isoMessageDto.getHexMessage()));
        ISOMessage isoMessage = ISOMessageMapper.mapToISOMessage(isoMessageDto);
        ISOMessage savedMessage = isoMessageRepository.save(isoMessage);
        return ISOMessageMapper.mapToISOMessageDto(savedMessage);
    }

    @Override
    public String decodeISOMessage(String hexMessage) {
        ISO8583Decoder decoder = new ISO8583Decoder();
        return decoder.decodeISOMessage(hexMessage);
    }

    private static class ISO8583Decoder {

        private static final Map<Integer, Integer> fieldLengths = new HashMap<>();

        static {
            fieldLengths.put(7, 10);  // Transmission date & time
            fieldLengths.put(11, 6);  // System trace audit number (STAN)
            fieldLengths.put(12, 12);  // Time, local transaction (hhmmss)
            fieldLengths.put(24, 3);  // Function code (ISO 8583:1993)
            fieldLengths.put(25, 4);  // Point of service condition code
            fieldLengths.put(27, 1);  // Length of authorization code (1 digit)
            fieldLengths.put(33, 8 );  // Forwarding institution identification code (LLVAR)
            fieldLengths.put(37, 12); // Retrieval reference number
            fieldLengths.put(39, 3);  // Response code
            fieldLengths.put(128, 8);  // Message authentication code

        }

        public String decodeISOMessage(String hexMessage) {
            Map<String, String> decodedFields = new HashMap<>();
            int startIndex = findMessageStartIndex(hexMessage);

            // If startIndex is -1, return an empty JSON
            if (startIndex == -1) {
                return "{}";
            }

            // Extract Message Type (4 caractères, 8 hex digits)
            String messageTypeHex = hexMessage.substring(startIndex, startIndex + 8);
            String messageType = hexToAscii(messageTypeHex);
            decodedFields.put("MessageType", messageType);

            // Extract Bitmap (16 hex digits for primary bitmap, 32 hex digits for extended bitmap)
            String bitmapHex = hexMessage.substring(startIndex + 8, startIndex + 24);
            if (bitmapHex.startsWith("8")) { // Check if extended bitmap is present
                bitmapHex = hexMessage.substring(startIndex + 8, startIndex + 40);
            }
            String bitmap = padRight(hexToBin(bitmapHex), 64); // Ensure it's 64 bits
            decodedFields.put("Bitmap", bitmapHex);

            // Parse Bitmap to determine fields present
            int[] fields = parseBitmap(bitmap);
            int currentPosition = startIndex + 24;  // Start after the bitmap

            // Adjust starting position for extended bitmap
            if (bitmapHex.length() > 16) {
                currentPosition = startIndex + 40;
            }

            for (int field : fields) {
                int fieldLength = fieldLengths.getOrDefault(field, 0); // Field length in digits
                if (field == 33) {
                    // Custom logic for field 33 to separate into field 27 and field 33
                    currentPosition = decodeField33(hexMessage, currentPosition, decodedFields);
                } else if (fieldLength == -1) {
                    // LLVAR field
                    currentPosition = decodeLLVARField(hexMessage, currentPosition, decodedFields, field);
                } else if (field == 128) {
                    // Field 128: Message Authentication Code (binary 8 bytes, 16 hex digits)
                    if (currentPosition + fieldLength * 2 <= hexMessage.length()) {
                        currentPosition = decodeBinaryField128(hexMessage, currentPosition, decodedFields, field, fieldLength);
                    } else {
                        // Log the error with additional details
                        System.out.println("Field 128 length exceeds message length. Current Position: " + currentPosition + ", Field Length: " + fieldLength * 2 + ", Message Length: " + hexMessage.length());
                        throw new RuntimeException("Field 128 length exceeds message length");
                    }
                } else if (fieldLength > 0) {
                    // Fixed length field
                    fieldLength *= 2; // Field length in hex digits
                    if (currentPosition + fieldLength <= hexMessage.length()) {
                        String fieldValueHex = hexMessage.substring(currentPosition, Math.min(currentPosition + fieldLength, hexMessage.length()));
                        String fieldValue = hexToAscii(fieldValueHex);
                        decodedFields.put(getFieldName(field), fieldValue.trim());
                        currentPosition += fieldLength;
                    } else {
                        System.out.println("Field " + field + " length exceeds message length. Current Position: " + currentPosition + ", Field Length: " + fieldLength + ", Message Length: " + hexMessage.length());
                        throw new RuntimeException("Field " + field + " length exceeds message length");
                    }
                }
            }

            return mapToJson(decodedFields);
        }

        private int decodeField33(String hexMessage, int currentPosition, Map<String, String> decodedFields) {
            String field33Hex = hexMessage.substring(currentPosition, currentPosition + 16); // Assuming maximum length for field 33
            String field33Ascii = hexToAscii(field33Hex);
            String lengthOfAuthorizationCode = field33Ascii.substring(0, 2); // First 2 characters
            String forwardingInstitutionIdentificationCode = field33Ascii.substring(2); // Rest of the characters

            decodedFields.put(getFieldName(27), lengthOfAuthorizationCode.trim());
            decodedFields.put(getFieldName(33), forwardingInstitutionIdentificationCode.trim());

            return currentPosition + 16; // Adjust as per actual length used
        }

        private int decodeBinaryField128(String hexMessage, int currentPosition, Map<String, String> decodedFields, int field, int fieldLength) {
            fieldLength *= 2; // Convert to hex digits length (binary field length)

            // Log pour déboguer
            System.out.println("Decoding field 128 at position: " + currentPosition + " with length: " + fieldLength);

            if (currentPosition + fieldLength <= hexMessage.length()) {
                String fieldValueHex = hexMessage.substring(currentPosition, currentPosition + fieldLength);
                // Convert hex to ASCII for binary field
                String fieldValue = hexToAscii(fieldValueHex);

                // Log pour vérifier la valeur extraite
                System.out.println("Field 128 value (hex): " + fieldValueHex);
                System.out.println("Field 128 value (ascii): " + fieldValue.trim());

                decodedFields.put(getFieldName(field), fieldValue.trim());
                return currentPosition + fieldLength;
            } else {
                // Log the error with additional details
                System.out.println("Field 128 length exceeds message length. Current Position: " + currentPosition + ", Field Length: " + fieldLength + ", Message Length: " + hexMessage.length());
                throw new RuntimeException("Field 128 length exceeds message length");
            }
        }

        private int decodeLLVARField(String hexMessage, int currentPosition, Map<String, String> decodedFields, int field) {
            int lengthIndicator = Integer.parseInt(hexToAscii(hexMessage.substring(currentPosition, currentPosition + 2)));
            currentPosition += 2;
            String fieldValueHex = hexMessage.substring(currentPosition, currentPosition + lengthIndicator * 2);
            String fieldValue = hexToAscii(fieldValueHex);
            decodedFields.put(getFieldName(field), fieldValue.trim());
            return currentPosition + lengthIndicator * 2;
        }

        private int findMessageStartIndex(String hexMessage) {
            String isoHex = "49534F"; // "ISO" in hex
            int startIndex = hexMessage.indexOf(isoHex);
            if (startIndex == -1) {
                return -1; // ISO identifier not found in the message
            }
            return startIndex + isoHex.length();
        }

        private String hexToBin(String hex) {
            StringBuilder binary = new StringBuilder();
            for (int i = 0; i < hex.length(); i++) {
                String hexChar = hex.substring(i, i + 1);
                int intChar = Integer.parseInt(hexChar, 16);
                binary.append(String.format("%4s", Integer.toBinaryString(intChar)).replace(' ', '0'));
            }
            return binary.toString();
        }

        private String padRight(String s, int n) {
            return String.format("%1$-" + n + "s", s).replace(' ', '0');
        }

        private String hexToAscii(String hex) {
            StringBuilder ascii = new StringBuilder();
            for (int i = 0; i < hex.length(); i += 2) {
                String hexChar = hex.substring(i, i + 2);
                int intChar = Integer.parseInt(hexChar, 16);
                ascii.append((char) intChar);
            }
            return ascii.toString();
        }

        private int[] parseBitmap(String bitmap) {
            int[] fields = new int[128];
            int fieldCount = 0;
            for (int i = 0; i < bitmap.length(); i++) {
                if (bitmap.charAt(i) == '1') {
                    fields[fieldCount++] = i + 1;
                }
            }
            int[] result = new int[fieldCount];
            System.arraycopy(fields, 0, result, 0, fieldCount);
            return result;
        }

        private String getFieldName(int field) {
            switch (field) {
                case 7: return "Transmissiondatetime";
                case 11: return "SystemtraceauditnumberSTAN";
                case 12: return "Timelocaltransactionhhmmss";
                case 24: return "FunctioncodeISO85831993NetworkInternationalidentifierNII";
                case 25: return "Pointofserviceconditioncode";
                case 27: return "Lengthofauthorizationcode";
                case 33: return "Forwardinginstitutionidentificationcode";
                case 37: return "Retrievalreferencenumber";
                case 39: return "Responsecode";
                case 128: return "Messageauthenticationcode";
                default: return "Field" + field;
            }
        }

        private String mapToJson(Map<String, String> map) {
            StringBuilder json = new StringBuilder("{\n");
            for (Map.Entry<String, String> entry : map.entrySet()) {
                json.append("  \"").append(entry.getKey()).append("\": \"").append(entry.getValue()).append("\",\n");
            }
            json.deleteCharAt(json.length() - 2); // Remove the last comma
            json.append("}");
            return json.toString();
        }
    }
}
