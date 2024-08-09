package hsid.demo.HSID_Backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "element_values")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Elementvalues {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer elementnumber;

    private String position;
    private String description_p;
    private String code;
    private String description_c;
    private String in_message;
    private String nomprotocole;
    private String service;
    @Column(name = "servicecode")
    private String servicecode;

}