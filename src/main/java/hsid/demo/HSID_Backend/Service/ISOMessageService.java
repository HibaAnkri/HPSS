package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Dtos.ISOMessageDto;

import java.util.List;

public interface ISOMessageService {
    List<ISOMessageDto> getAllMessages();
    ISOMessageDto getMessageById(Long id);
    ISOMessageDto createMessage(ISOMessageDto isoMessageDto);
    String decodeISOMessage(String hexMessage);


}
