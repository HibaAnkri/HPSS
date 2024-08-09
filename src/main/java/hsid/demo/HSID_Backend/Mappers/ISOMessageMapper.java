package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.ISOMessageDto;
import hsid.demo.HSID_Backend.Entities.ISOMessage;

public class ISOMessageMapper {
    public static ISOMessageDto mapToISOMessageDto(ISOMessage isoMessage){
        return new ISOMessageDto(
                isoMessage.getId(),
                isoMessage.getHexMessage(),
                isoMessage.getDecodedMessage()
        );
    }

    public static ISOMessage mapToISOMessage(ISOMessageDto isoMessageDto){
        return new ISOMessage(
                isoMessageDto.getId(),
                isoMessageDto.getHexMessage(),
                isoMessageDto.getDecodedMessage()
        );
    }


}
