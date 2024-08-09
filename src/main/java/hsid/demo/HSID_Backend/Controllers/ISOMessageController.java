package hsid.demo.HSID_Backend.Controllers;

import hsid.demo.HSID_Backend.Service.ISOMessageService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@AllArgsConstructor
@RestController
@RequestMapping("/api/iso-messages")
public class ISOMessageController {

    private final ISOMessageService isoMessageService;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/decode")
    public ResponseEntity<String> decodeMessage(@RequestBody Map<String, String> request) {
        String hexMessage = request.get("hexMessage");
        String decodedMessage = isoMessageService.decodeISOMessage(hexMessage);
        return ResponseEntity.ok(decodedMessage);
    }
}
