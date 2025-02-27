package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.User;

import hsid.demo.HSID_Backend.Enum.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findFirstByEmail(String email);
    Optional<User> findByRole(Role role);
}