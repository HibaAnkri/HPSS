package hsid.demo.HSID_Backend.Controllers;

import hsid.demo.HSID_Backend.Dtos.ProtocoleDto;
import hsid.demo.HSID_Backend.Service.ProtocoleService;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping()
public class ProtocoleController {

    private final ProtocoleService protocoleService;
    private static final Logger logger = LoggerFactory.getLogger(ProtocoleController.class);

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/protocoles")
    public ResponseEntity<List<ProtocoleDto>> getProtocoles() {
        List<ProtocoleDto> protocoles = protocoleService.getProtocoles();
        return ResponseEntity.ok(protocoles);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/protocoles/{nomprotocole}")
    public ResponseEntity<ProtocoleDto> getProtocoleById(@PathVariable("nomprotocole") String nomprotocole) {
        ProtocoleDto protocoleDto = protocoleService.getProtocoleById(nomprotocole);
        return ResponseEntity.ok(protocoleDto);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/protocoles")
    public ResponseEntity<ProtocoleDto> addProtocole(@RequestBody ProtocoleDto protocoleDto) {
        try {
            ProtocoleDto newProtocole = protocoleService.addProtocole(protocoleDto);
            return ResponseEntity.ok(newProtocole);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/protocoles/{id}")
    public ResponseEntity<Void> deleteProtocole(@PathVariable("id") Long id) {
        protocoleService.deleteProtocole(id);
        return ResponseEntity.noContent().build();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/protocoles/{id}")
    public ResponseEntity<ProtocoleDto> updateProtocole(@PathVariable("id") Long id, @RequestBody ProtocoleDto protocoleDto) {
        logger.info("Received request to update protocole with id: {}", id);
        try {
            ProtocoleDto updatedProtocole = protocoleService.updateProtocole(id, protocoleDto);
            logger.info("Protocole updated successfully: {}", updatedProtocole);
            return ResponseEntity.ok(updatedProtocole);
        } catch (Exception e) {
            logger.error("Error updating protocole", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/protocoles/delete")
    public ResponseEntity<Void> deleteProtocole(@RequestBody List<Long> ids) {
        ids.forEach(id -> protocoleService.deleteProtocole(id));
        return ResponseEntity.noContent().build();
    }
}
