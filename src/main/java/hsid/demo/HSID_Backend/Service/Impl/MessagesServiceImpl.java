package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Dtos.MessagesDto;
import hsid.demo.HSID_Backend.Entities.Messages;
import hsid.demo.HSID_Backend.Mappers.MessagesMapper;
import hsid.demo.HSID_Backend.Repository.MessagesRepository;
import hsid.demo.HSID_Backend.Service.MessagesService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@AllArgsConstructor
public class MessagesServiceImpl implements MessagesService {
    private final MessagesRepository messagesRepository;
    private static final Logger logger = LoggerFactory.getLogger(MessagesServiceImpl.class);



    @Override
    public MessagesDto getMessageById(String code) {
        Messages messages = messagesRepository.findByCode(code);
        if (messages == null) {
            throw new EntityNotFoundException("Message not found with code: " + code);
        }
        return MessagesMapper.mapToMessagesDto(messages);
    }

    @Override
    public List<Messages> getMessagesByprotocol(String nomprotocole) {
        return messagesRepository.findByNomprotocole(nomprotocole);
    }

    @Override
    public void deleteMessage(Long id) {
        messagesRepository.deleteById(id);
    }

    @Override
    public MessagesDto addMessage(MessagesDto messagesDto) {
        logger.info("Adding message: {}", messagesDto);

        // Mappage du DTO à l'entité sans l'ID
        Messages message = new Messages();
        message.setNomprotocole(messagesDto.getNomprotocole());
        message.setCode(messagesDto.getCode());
        message.setSpecification(messagesDto.getSpecification());

        // Sauvegarder l'entité, la base de données génère l'ID
        Messages savedMessage = messagesRepository.save(message);
        logger.info("Message saved: {}", savedMessage);

        // Retourner le DTO du message sauvegardé avec l'ID généré
        return MessagesMapper.mapToMessagesDto(savedMessage);

    }


    @Override
    public MessagesDto updateMessage(Long id, MessagesDto messagesDto) {
        logger.info("Updating message with id: {}", id);
        Messages existingMessage = messagesRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Message not found with id: " + id));
        existingMessage.setNomprotocole(messagesDto.getNomprotocole());
        existingMessage.setCode(messagesDto.getCode());
        existingMessage.setSpecification(messagesDto.getSpecification());
        Messages updatedMessage = messagesRepository.save(existingMessage);
        logger.info("Message updated: {}", updatedMessage);
        return MessagesMapper.mapToMessagesDto(updatedMessage);
    }
    @Override
    public List<MessagesDto> getMessages() {
        List<Messages> messages = messagesRepository.findAllByOrderByCodeAsc();  // Use sorted method
        return messages.stream().map(MessagesMapper::mapToMessagesDto)
                .collect(Collectors.toList());
    }
}

