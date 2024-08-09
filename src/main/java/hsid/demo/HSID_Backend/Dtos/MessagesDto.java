package hsid.demo.HSID_Backend.Dtos;

import hsid.demo.HSID_Backend.Entities.Elements;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessagesDto {
    Long id;
    String nomprotocole;
    String code;
    String specification;
}
