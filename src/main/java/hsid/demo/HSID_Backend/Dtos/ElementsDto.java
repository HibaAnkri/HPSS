package hsid.demo.HSID_Backend.Dtos;

import hsid.demo.HSID_Backend.Entities.Messages;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElementsDto {
    Long elementnumber;
    String attribute;
    String description;

}
