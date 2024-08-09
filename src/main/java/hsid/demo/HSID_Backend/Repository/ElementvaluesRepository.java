package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.Elementvalues;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ElementvaluesRepository extends JpaRepository<Elementvalues, Long> {
    List<Elementvalues> findByElementnumberAndNomprotocole(Integer elementnumber, String nomprotocole);
    List<Elementvalues> findByElementnumber(Integer elementnumber);
    List<Elementvalues> findByElementnumberAndPosition(Integer elementnumber, String position);
    List<Elementvalues> findByNomprotocole(String nomprotocole);
    boolean existsByElementnumberAndNomprotocole(Integer elementnumber, String nomprotocole);

    List<Elementvalues> findByNomprotocoleAndServiceAndServicecode(String nomprotocole, String service, String servicecode);

    boolean existsByElementnumberAndPositionAndCode(Integer elementnumber, String position, String code);
}
