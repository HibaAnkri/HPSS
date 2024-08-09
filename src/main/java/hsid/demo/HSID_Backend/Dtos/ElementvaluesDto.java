package hsid.demo.HSID_Backend.Dtos;

import hsid.demo.HSID_Backend.Entities.Elementvalues;
import lombok.*;



@Getter
@Data
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ElementvaluesDto {
    private Long id;
    private Integer elementnumber;
    private String position;
    private String description_p;
    private String code;
    private String description_c;
    private String in_message;
    private String nomprotocole;
    private String service;
    private String servicecode;


}