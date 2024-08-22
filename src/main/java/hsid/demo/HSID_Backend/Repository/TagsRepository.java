package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.Tags;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagsRepository extends JpaRepository<Tags, Long> {
    List<Tags> findByElementNumber(int elementNumber);
    List<Tags> findByElementNumberAndNomprotocole(Integer elementNumber, String nomprotocole);
}

