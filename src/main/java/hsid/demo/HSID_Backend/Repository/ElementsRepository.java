package hsid.demo.HSID_Backend.Repository;

import hsid.demo.HSID_Backend.Entities.Elements;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElementsRepository extends JpaRepository<Elements,Long> {
}
