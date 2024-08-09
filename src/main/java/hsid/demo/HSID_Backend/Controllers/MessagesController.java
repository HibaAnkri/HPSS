package hsid.demo.HSID_Backend.Controllers;

import hsid.demo.HSID_Backend.Dtos.MessagesDto;
import hsid.demo.HSID_Backend.Entities.Messages;
import hsid.demo.HSID_Backend.Service.MessagesService;
import lombok.AllArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@AllArgsConstructor
@RequestMapping()
public class MessagesController {

    private final MessagesService messagesService;
    private static final Logger logger = LoggerFactory.getLogger(MessagesController.class);

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/messages")
    public ResponseEntity<List<MessagesDto>> getMessages() {
        List<MessagesDto> messages = messagesService.getMessages();
        return ResponseEntity.ok(messages);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/messages/{code}")
    public ResponseEntity<MessagesDto> getMessageById(@PathVariable("code") String code) {
        MessagesDto messagesDto = messagesService.getMessageById(code);
        return ResponseEntity.ok(messagesDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/messages/protocole/{nomprotocole}")
    public List<Messages> getMessagesByprotocol(@PathVariable String nomprotocole) {
        return messagesService.getMessagesByprotocol(nomprotocole);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/messages/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable("id") Long id) {
        messagesService.deleteMessage(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/messages")
    public ResponseEntity<MessagesDto> addMessage(@RequestBody MessagesDto messagesDto) {
        logger.info("Received request to add message: {}", messagesDto);
        try {
            MessagesDto newMessage = messagesService.addMessage(messagesDto);
            logger.info("Message added successfully: {}", newMessage);
            return ResponseEntity.ok(newMessage);
        } catch (Exception e) {
            logger.error("Error adding message", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/messages/{id}")
    public ResponseEntity<MessagesDto> updateMessage(@PathVariable("id") Long id, @RequestBody MessagesDto messagesDto) {
        logger.info("Received request to update message with id: {}", id);
        try {
            MessagesDto updatedMessage = messagesService.updateMessage(id, messagesDto);
            logger.info("Message updated successfully: {}", updatedMessage);
            return ResponseEntity.ok(updatedMessage);
        } catch (Exception e) {
            logger.error("Error updating message", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/messages/delete")
    public ResponseEntity<Void> deleteMessages(@RequestBody List<Long> ids) {
        ids.forEach(id -> messagesService.deleteMessage(id));
        return ResponseEntity.noContent().build();
    }



}

