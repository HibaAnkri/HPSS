package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Dtos.ElementvaluesDto;
import hsid.demo.HSID_Backend.Entities.Elementvalues;

import java.util.List;

public interface ElementvaluesService {
    List<ElementvaluesDto> getElementValuesByElementnumberAndNomprotocole(Integer elementnumber, String nomprotocole);
    List<ElementvaluesDto> getElementValuesByElementnumberAndCode(Integer elementnumber, String code);
    List<ElementvaluesDto> getElementValuesByElementnumberCodeAndPosition(Integer elementnumber, String code, String position);
    List<ElementvaluesDto> getElementValuesByCode(String code);
    List<ElementvaluesDto> getElementValuesByElementnumber(Integer elementnumber);
    List<ElementvaluesDto> getElementValuesByElementnumberAndPosition(Integer elementnumber, String position);
    List<String> getPositionsByElementnumber(Integer elementnumber);

    List<Elementvalues> findByProtocolServiceAndServicecode(String nomprotocole, String service, String servicecode);

    ElementvaluesDto createElementValue(ElementvaluesDto elementvaluesDto);
    void deleteElementValue(Long id);

    // Ajoutez cette méthode
    boolean existsByElementnumberAndPositionAndCode(Integer elementnumber, String position, String code);

    ElementvaluesDto updateElementValue(Long id, ElementvaluesDto elementvaluesDto);
}
