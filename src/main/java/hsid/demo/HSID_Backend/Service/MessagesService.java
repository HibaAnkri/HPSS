package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Dtos.MessagesDto;
import hsid.demo.HSID_Backend.Entities.Messages;

import java.util.List;

public interface MessagesService {
    List<MessagesDto> getMessages();
    MessagesDto getMessageById(String code);
    List<Messages> getMessagesByprotocol(String nomprotocole);

    void deleteMessage(Long id);
    MessagesDto addMessage(MessagesDto messagesDto);
    MessagesDto updateMessage(Long id, MessagesDto messagesDto);

}
