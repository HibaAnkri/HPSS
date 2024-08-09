package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.ISOMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISOMessageRepository extends JpaRepository<ISOMessage, Long> {
}