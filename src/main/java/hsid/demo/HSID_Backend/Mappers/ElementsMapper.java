package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.ElementsDto;
import hsid.demo.HSID_Backend.Entities.Elements;


public class ElementsMapper {
    public static ElementsDto mapToElementsDto(Elements elements){
        return new ElementsDto(
                elements.getElementnumber(),
                elements.getAttribute(),
                elements.getDescription()
        );
    }
    public static Elements mapToElements(ElementsDto elementsDto){
        return new Elements(
                elementsDto.getElementnumber(),
                elementsDto.getAttribute(),
                elementsDto.getDescription()
        );
    }
}
