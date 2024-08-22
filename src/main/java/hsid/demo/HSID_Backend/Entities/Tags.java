package hsid.demo.HSID_Backend.Entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tags")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tags {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer elementNumber;
    private String tag;
    private String nom;
    private String longueur;
    private String format;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String nomprotocole;
}


