package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.Messages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessagesRepository extends JpaRepository<Messages, Long> {
    Messages findByCode(String code);

    List<Messages> findByNomprotocole(String nomprotocole);

    List<Messages> findAllByOrderById();
    // Method to sort messages by code
    List<Messages> findAllByOrderByCodeAsc();
}
