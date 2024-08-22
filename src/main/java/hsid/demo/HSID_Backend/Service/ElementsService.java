package hsid.demo.HSID_Backend.Service;


import hsid.demo.HSID_Backend.Dtos.TagsDto;
import hsid.demo.HSID_Backend.Entities.Element;

import java.util.List;
import java.util.Map;

public interface ElementsService {


    List<Element> getSpecificAttribute(String attribute);

    void updateSpecificAttributeValue(int elementNumber, String attributeName, String newValue);


}
