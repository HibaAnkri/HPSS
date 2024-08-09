package hsid.demo.HSID_Backend;
import java.util.HashMap;
import java.util.Map;

public class ISO8583Decoder {

    private static final Map<Integer, ElementMetadata> elementMetadataMap = new HashMap<>();

    static {
        elementMetadataMap.put(1, new ElementMetadata(64, "Bitmap secondaire", "Tous les messages contenant des éléments d'index supérieur à 127"));
        elementMetadataMap.put(2, new ElementMetadata(-19, "Numéro de compte primaire", "Extrait de la piste 2 ou de la puce"));
        elementMetadataMap.put(3, new ElementMetadata(6, "Code traitement", "Divers codes de transaction"));
        elementMetadataMap.put(4, new ElementMetadata(12, "Montant de transaction", "Représenté avec deux décimales"));
        elementMetadataMap.put(5, new ElementMetadata(12, "Montant de consolidation", "Représenté avec deux décimales"));
        elementMetadataMap.put(6, new ElementMetadata(12, "Montant de facturation", "Représenté avec deux décimales"));
        elementMetadataMap.put(7, new ElementMetadata(10, "Date et heure de transmission", "Tous les messages"));
        elementMetadataMap.put(9, new ElementMetadata(8, "Taux de change de la consolidation", "Présent dans tous les messages contenant l’élément « montant de consolidation »"));
        elementMetadataMap.put(10, new ElementMetadata(8, "Taux de change de la facturation du titulaire de la carte", "Présent dans tous les messages contenant l’élément « montant de facturation »"));
        elementMetadataMap.put(11, new ElementMetadata(6, "Numéro d’audit du système de suivi", "Tous les messages"));
        elementMetadataMap.put(12, new ElementMetadata(12, "Date et heure locale de la transaction", "Tous les messages"));
        elementMetadataMap.put(14, new ElementMetadata(4, "Date d’expiration", "11XX, 12XX"));
        elementMetadataMap.put(15, new ElementMetadata(6, "Date de consolidation", "11XX, 12XX, 14XX, 15XX"));
        elementMetadataMap.put(16, new ElementMetadata(4, "Date de change", "Tous les messages où l’élément taux de change est présent"));
        elementMetadataMap.put(18, new ElementMetadata(4, "Type de commerce", "11XX, 12XX"));
        elementMetadataMap.put(19, new ElementMetadata(3, "Code pays de l’organisme acquéreur", "1100, 1200, 1120, 1220"));
        elementMetadataMap.put(21, new ElementMetadata(3, "Code pays de l’organisme transmetteur", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(22, new ElementMetadata(12, "Code données du point de service", "HPS Switch"));
        elementMetadataMap.put(23, new ElementMetadata(3, "Numéro séquentiel de la carte", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(24, new ElementMetadata(3, "Code fonction", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(25, new ElementMetadata(4, "Code raison du message", "HPS Switch"));
        elementMetadataMap.put(27, new ElementMetadata(1, "Longueur du code d’autorisation", "1110, 1130, 1210, 1230, 1314, 1324, 1530, 1532, 1814"));
        elementMetadataMap.put(28, new ElementMetadata(8, "Montant du frais de surcharge", "1200, 122X, 142X"));
        elementMetadataMap.put(30, new ElementMetadata(24, "Montants initiaux", "1420, 1422"));
        elementMetadataMap.put(32, new ElementMetadata(-11, "Code d’identification de l’organisme acquéreur", "HPS Switch"));
        elementMetadataMap.put(33, new ElementMetadata(-11, "Code d’identification de l’organisme initiateur", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(35, new ElementMetadata(-37, "Piste ISO2", "1100, 1200"));
        elementMetadataMap.put(37, new ElementMetadata(12, "Numéro de référence de recouvrement", "Tous les messages"));
        elementMetadataMap.put(38, new ElementMetadata(6, "Code autorisation", "Tous les messages de réponse"));
        elementMetadataMap.put(39, new ElementMetadata(3, "Code action", "Tous les messages de réponse"));
        elementMetadataMap.put(41, new ElementMetadata(8, "Identifiant du terminal de l’accepteur de carte", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(42, new ElementMetadata(15, "Code d’identification de l’accepteur de la carte", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(43, new ElementMetadata(-40, "Nom et adresse de l’accepteur de la carte", "1100, 1120, 1200, 1220, 1221"));
        elementMetadataMap.put(45, new ElementMetadata(-76, "Piste ISO1", "1100, 1200"));
        elementMetadataMap.put(46, new ElementMetadata(-204, "Montant des frais", "1304 (aucun traitement associé, usage futur)"));
        elementMetadataMap.put(48, new ElementMetadata(-999, "Données supplémentaires privées", "11XX, 12XX"));
        elementMetadataMap.put(49, new ElementMetadata(3, "Code monnaie de la transaction", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(50, new ElementMetadata(3, "Code monnaie de la consolidation", "11XX, 12XX, 14XX, 15XX"));
        elementMetadataMap.put(51, new ElementMetadata(3, "Code monnaie de la facture du titulaire de carte", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(52, new ElementMetadata(8, "Pin", "1100, 1200"));
        elementMetadataMap.put(53, new ElementMetadata(-99, "Informations de contrôle de sécurité", "Tous les messages de demande"));
        elementMetadataMap.put(54, new ElementMetadata(-120, "Montants supplémentaires", "12XX, 14XX, 15XX"));
        elementMetadataMap.put(55, new ElementMetadata(-255, "Données liées aux cartes à microcircuit", "11XX, 12XX"));
        elementMetadataMap.put(56, new ElementMetadata(-35, "Eléments d’information initiaux", "142X"));
        elementMetadataMap.put(60, new ElementMetadata(-999, "Réservé pour usage national", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(61, new ElementMetadata(-999, "Réservé pour usage privé", "11XX, 12XX, 14XX"));
        elementMetadataMap.put(62, new ElementMetadata(-999, "Réservé pour usage privé", "1110, 1210"));
        elementMetadataMap.put(73, new ElementMetadata(6, "Date de l’action", "13XX"));
        elementMetadataMap.put(74, new ElementMetadata(10, "Nombre de crédits", "15XX"));
        elementMetadataMap.put(75, new ElementMetadata(10, "Nombre de redressements de crédit", "15XX"));
        elementMetadataMap.put(76, new ElementMetadata(10, "Nombre de débits", "15XX"));
        elementMetadataMap.put(77, new ElementMetadata(10, "Nombre de redressements de débit", "15XX"));
        elementMetadataMap.put(83, new ElementMetadata(10, "Nombre de paiements", "15XX"));
        elementMetadataMap.put(84, new ElementMetadata(10, "Nombre de redressements de paiements", "15XX"));
        elementMetadataMap.put(86, new ElementMetadata(16, "Montant des crédits", "15XX"));
        elementMetadataMap.put(87, new ElementMetadata(16, "Montant des crédits redressés", "15XX"));
        elementMetadataMap.put(88, new ElementMetadata(16, "Montant des débits", "15XX"));
        elementMetadataMap.put(89, new ElementMetadata(16, "Montant des débits redressés", "15XX"));
        elementMetadataMap.put(93, new ElementMetadata(-11, "Code d’identification de l’organisme destinataire de la transaction", "13XX, 18XX"));
        elementMetadataMap.put(94, new ElementMetadata(-11, "Code d’identification de l’organisme initiateur de la transaction", "13XX, 18XX"));
        elementMetadataMap.put(97, new ElementMetadata(16, "Montant net de la consolidation", "15XX"));
        elementMetadataMap.put(99, new ElementMetadata(-11, "Code d’identification de l’organisme de règlement", "15XX"));
        elementMetadataMap.put(100, new ElementMetadata(-11, "Institution de destination", "16XX"));
        elementMetadataMap.put(101, new ElementMetadata(-17, "Nom de fichier", "13XX"));
        elementMetadataMap.put(102, new ElementMetadata(-28, "Identification du compte 1", "11XX, 12XX, 13XX, 14XX"));
        elementMetadataMap.put(103, new ElementMetadata(-28, "Identification du compte 2", "11XX, 12XX, 13XX, 14XX"));
        elementMetadataMap.put(105, new ElementMetadata(16, "Montant des rejets de crédit", "15XX"));
        elementMetadataMap.put(106, new ElementMetadata(16, "Montant des rejets de débit", "15XX"));
        elementMetadataMap.put(107, new ElementMetadata(10, "Nombre de rejets de crédit", "15XX"));
        elementMetadataMap.put(108, new ElementMetadata(10, "Nombre de rejets de débit", "15XX"));
        elementMetadataMap.put(127, new ElementMetadata(-999, "Données VbV & 3D-Secure", "11XX, 12XX"));
        elementMetadataMap.put(128, new ElementMetadata(8, "Code d’authentification du message", "Tous les messages"));
    }

    public String decodeISOMessage(String hexMessage) {
        Map<String, String> decodedFields = new HashMap<>();
        int currentIndex = findMessageStartIndex(hexMessage);

        if (currentIndex == -1) {
            return "{}";
        }

        // Skip the header if present
        currentIndex = skipHeader(hexMessage, currentIndex);

        // Now process the rest of the message starting from the currentIndex
        String messageTypeHex = hexMessage.substring(currentIndex, currentIndex + 8);
        String messageType = hexToAscii(messageTypeHex);
        decodedFields.put("MessageType", messageType);

        String bitmapHex = hexMessage.substring(currentIndex + 8, currentIndex + 24);
        if (bitmapHex.startsWith("8")) {
            bitmapHex = hexMessage.substring(currentIndex + 8, currentIndex + 40);
        }
        String bitmap = padRight(hexToBin(bitmapHex), 64);
        decodedFields.put("Bitmap", bitmapHex);

        int[] fields = parseBitmap(bitmap);
        currentIndex += 24;

        if (bitmapHex.length() > 16) {
            currentIndex += 16;
        }

        for (int field : fields) {
            ElementMetadata metadata = elementMetadataMap.getOrDefault(field, new ElementMetadata(0, "Field" + field, ""));
            int fieldLength = metadata.getLength();
            if (fieldLength == -1) {
                currentIndex = decodeLLVARField(hexMessage, currentIndex, decodedFields, field, metadata);
            } else if (field == 128) {
                currentIndex = decodeBinaryField128(hexMessage, currentIndex, decodedFields, field, fieldLength, metadata);
            } else if (fieldLength > 0) {
                fieldLength *= 2;
                if (currentIndex + fieldLength <= hexMessage.length()) {
                    String fieldValueHex = hexMessage.substring(currentIndex, currentIndex + fieldLength);
                    String fieldValue = hexToAscii(fieldValueHex);
                    decodedFields.put(metadata.getDescription(), fieldValue.trim());
                    currentIndex += fieldLength;
                } else {
                    throw new RuntimeException("Field " + field + " length exceeds message length");
                }
            }
        }

        return mapToJson(decodedFields);
    }

    private int skipHeader(String hexMessage, int currentIndex) {
        String isoHeader = "49534F"; // "ISO" in hex
        int isoIndex = hexMessage.indexOf(isoHeader, currentIndex);
        if (isoIndex != -1) {
            // Move past the ISO part
            currentIndex = isoIndex + isoHeader.length();
        }

        String headerSequence = "3730313030303030"; // "70100000" in hex
        if (hexMessage.length() >= currentIndex + headerSequence.length() &&
                hexMessage.substring(currentIndex, currentIndex + headerSequence.length()).equals(headerSequence)) {
            currentIndex += headerSequence.length();
        }

        return currentIndex;
    }

    private int findMessageStartIndex(String hexMessage) {
        String isoHex = "49534F";
        int startIndex = hexMessage.indexOf(isoHex);
        if (startIndex == -1) {
            return -1;
        }
        return startIndex + isoHex.length();
    }

    private int decodeLLVARField(String hexMessage, int currentIndex, Map<String, String> decodedFields, int field, ElementMetadata metadata) {
        int lengthIndicator = Integer.parseInt(hexToAscii(hexMessage.substring(currentIndex, currentIndex + 2)));
        currentIndex += 2;
        String fieldValueHex = hexMessage.substring(currentIndex, currentIndex + lengthIndicator * 2);
        String fieldValue = hexToAscii(fieldValueHex);
        decodedFields.put(metadata.getDescription(), fieldValue.trim());
        return currentIndex + lengthIndicator * 2;
    }

    private int decodeBinaryField128(String hexMessage, int currentIndex, Map<String, String> decodedFields, int field, int fieldLength, ElementMetadata metadata) {
        fieldLength *= 2;
        if (currentIndex + fieldLength <= hexMessage.length()) {
            String fieldValueHex = hexMessage.substring(currentIndex, currentIndex + fieldLength);
            String fieldValue = hexToAscii(fieldValueHex);
            decodedFields.put(metadata.getDescription(), fieldValue.trim());
            return currentIndex + fieldLength;
        } else {
            throw new RuntimeException("Field 128 length exceeds message length");
        }
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
        for (int i = 0; hex != null && i < hex.length(); i += 2) {
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

    private String mapToJson(Map<String, String> map) {
        StringBuilder json = new StringBuilder("{\n");
        for (Map.Entry<String, String> entry : map.entrySet()) {
            json.append("  \"").append(entry.getKey()).append("\": \"").append(entry.getValue()).append("\",\n");
        }
        json.deleteCharAt(json.length() - 2);
        json.append("}");
        return json.toString();
    }

    private static class ElementMetadata {
        private final int length;
        private final String description;
        private final String utilisation;

        public ElementMetadata(int length, String description, String utilisation) {
            this.length = length;
            this.description = description;
            this.utilisation = utilisation;
        }

        public int getLength() {
            return length;
        }

        public String getDescription() {
            return description;
        }

        public String getUtilisation() {
            return utilisation;
        }
    }
}
