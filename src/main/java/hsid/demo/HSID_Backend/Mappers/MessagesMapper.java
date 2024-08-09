package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.MessagesDto;
import hsid.demo.HSID_Backend.Entities.Messages;

public class MessagesMapper {
    public static MessagesDto mapToMessagesDto(Messages messages) {
        return new MessagesDto(
                messages.getId(),
                messages.getNomprotocole(),
                messages.getCode(),
                messages.getSpecification()
        );
    }

    public static Messages mapToMessages(MessagesDto messagesDto) {
        Messages messages = new Messages();
        messages.setId(messagesDto.getId());
        messages.setNomprotocole(messagesDto.getNomprotocole());
        messages.setCode(messagesDto.getCode());
        messages.setSpecification(messagesDto.getSpecification());
        return messages;
    }
}

