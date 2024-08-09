package hsid.demo.HSID_Backend.Dtos;

import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProtocoleDto {
    Long id;
    String nomprotocole;
    String description;
    String version;
}
