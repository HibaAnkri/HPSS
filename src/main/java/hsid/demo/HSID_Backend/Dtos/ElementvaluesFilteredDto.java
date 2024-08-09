package hsid.demo.HSID_Backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElementvaluesFilteredDto {
    private Integer elementnumber;
    private String position;
    private String description_p;
    private String code_description_c;
}
