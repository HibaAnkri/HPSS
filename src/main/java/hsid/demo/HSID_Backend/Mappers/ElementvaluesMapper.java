package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.ElementvaluesDto;
import hsid.demo.HSID_Backend.Entities.Elementvalues;

public class ElementvaluesMapper {
    public static ElementvaluesDto mapToElementValueDto(Elementvalues elementvalues) {
        return new ElementvaluesDto(
                elementvalues.getId(),
                elementvalues.getElementnumber(),
                elementvalues.getPosition(),
                elementvalues.getDescription_p(),
                elementvalues.getCode(),
                elementvalues.getDescription_c(),
                elementvalues.getIn_message(),
                elementvalues.getNomprotocole(),
                elementvalues.getService(),
                elementvalues.getServicecode()
        );
    }

    public static Elementvalues mapToElementValue(ElementvaluesDto elementValueDto) {
        Elementvalues elementValue = new Elementvalues();
        elementValue.setElementnumber(elementValueDto.getElementnumber());
        elementValue.setPosition(elementValueDto.getPosition());
        elementValue.setDescription_p(elementValueDto.getDescription_p());
        elementValue.setCode(elementValueDto.getCode());
        elementValue.setDescription_c(elementValueDto.getDescription_c());
        elementValue.setIn_message(elementValueDto.getIn_message());
        elementValue.setNomprotocole(elementValueDto.getNomprotocole());
        elementValue.setService(elementValueDto.getService());
        elementValue.setServicecode(elementValueDto.getServicecode());
        return elementValue;
    }
}

