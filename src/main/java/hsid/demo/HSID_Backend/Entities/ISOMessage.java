package hsid.demo.HSID_Backend.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "iso_message")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ISOMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String hexMessage;

    @Column(columnDefinition = "TEXT")
    private String decodedMessage;
}