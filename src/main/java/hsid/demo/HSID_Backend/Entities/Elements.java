package hsid.demo.HSID_Backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "elements")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Elements {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long elementnumber;

    String attribute;
    String description;


}
