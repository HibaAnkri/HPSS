package hsid.demo.HSID_Backend.Entities;


import hsid.demo.HSID_Backend.Enum.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;

    private String password;

    private Role role;

    private Boolean active = false; // Default to inactive
}
