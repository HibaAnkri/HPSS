package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.Protocole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProtocoleRepository extends JpaRepository<Protocole, Long> {

    Protocole findBynomprotocole(String nomprotocole);
}
