package hsid.demo.HSID_Backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ISOMessageDto {
    private Long id;
    private String hexMessage;
    private String decodedMessage;
}