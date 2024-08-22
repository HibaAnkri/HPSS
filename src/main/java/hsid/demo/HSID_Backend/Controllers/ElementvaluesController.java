package hsid.demo.HSID_Backend.Controllers;

import hsid.demo.HSID_Backend.Dtos.ElementvaluesDto;
import hsid.demo.HSID_Backend.Dtos.TagsDto;
import hsid.demo.HSID_Backend.Entities.Elementvalues;
import hsid.demo.HSID_Backend.Service.ElementvaluesService;
import org.apache.tomcat.util.bcel.classfile.ElementValue;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class ElementvaluesController {

    private final ElementvaluesService elementvaluesService;

    @Autowired
    public ElementvaluesController(ElementvaluesService elementvaluesService) {
        this.elementvaluesService = elementvaluesService;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/element-values")
    public List<ElementvaluesDto> getElementValues(
            @RequestParam(required = false) Integer elementnumber,
            @RequestParam(required = false) String nomprotocole,
            @RequestParam(required = false) String code,
            @RequestParam(required = false) String position) {

        if (elementnumber == null && code == null && nomprotocole == null && position == null) {
            return Collections.emptyList();
        }

        if (elementnumber != null && code != null && position != null) {
            return elementvaluesService.getElementValuesByElementnumberCodeAndPosition(elementnumber, code, position);
        } else if (elementnumber != null && code != null) {
            return elementvaluesService.getElementValuesByElementnumberAndCode(elementnumber, code);
        } else if (elementnumber != null && nomprotocole != null) {
            return elementvaluesService.getElementValuesByElementnumberAndNomprotocole(elementnumber, nomprotocole);
        } else if (code != null) {
            return elementvaluesService.getElementValuesByCode(code);
        } else if (elementnumber != null) {
            return elementvaluesService.getElementValuesByElementnumber(elementnumber);
        } else {
            throw new IllegalArgumentException("Invalid combination of parameters");
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/positions")
    public List<String> getPositionsByElementNumber(@RequestParam Integer elementnumber) {
        List<ElementvaluesDto> elementValues = elementvaluesService.getElementValuesByElementnumber(elementnumber);
        return elementValues.stream()
                .map(ElementvaluesDto::getPosition)
                .distinct()
                .collect(Collectors.toList());
    }


    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/descriptions")
    public List<String> getDescriptionsByElementNumber(@RequestParam Integer elementnumber) {
        List<ElementvaluesDto> elementValues = elementvaluesService.getElementValuesByElementnumber(elementnumber);
        return elementValues.stream()
                .map(ElementvaluesDto::getDescription_p)
                .distinct()
                .collect(Collectors.toList());
    }
   /* @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/positions/descriptions")
    public Map<String, String> getPositionsWithDescriptions(@RequestParam Integer elementnumber) {
        List<ElementvaluesDto> elementValues = elementvaluesService.getElementValuesByElementnumber(elementnumber);
        return elementValues.stream()
                .collect(Collectors.toMap(ElementvaluesDto::getPosition, ElementvaluesDto::getDescription_p, (existing, replacement) -> existing));
    }*/
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/in-messages")
    public List<String> getInMessagesByElementNumber(@RequestParam Integer elementnumber) {
        List<ElementvaluesDto> elementValues = elementvaluesService.getElementValuesByElementnumber(elementnumber);
        return elementValues.stream()
                .map(ElementvaluesDto::getIn_message)
                .distinct()
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/search")
    public List<Elementvalues> getElementValues(
            @RequestParam(required = false) String nomprotocole,
            @RequestParam(required = false) String service,
            @RequestParam(required = false) String servicecode) {
        return elementvaluesService.findByProtocolServiceAndServicecode(nomprotocole, service, servicecode);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/element-values")
    public ResponseEntity<?> createElementValue(
            @RequestParam Integer elementnumber,
            @RequestParam String position,
            @RequestParam String description_p,
            @RequestBody ElementvaluesDto elementvaluesDto) {

        try {

            boolean exists = elementvaluesService.existsByElementnumberAndPositionAndCode(elementnumber, position, elementvaluesDto.getCode());
            if (exists) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Code already exists for the given position");
            }


            elementvaluesDto.setElementnumber(elementnumber);
            elementvaluesDto.setPosition(position);
            elementvaluesDto.setDescription_p(description_p);


            elementvaluesDto.setService(null);
            elementvaluesDto.setServicecode(null);
            elementvaluesDto.setIn_message(null);


            ElementvaluesDto createdValue = elementvaluesService.createElementValue(elementvaluesDto);


            return ResponseEntity.status(HttpStatus.CREATED).body(createdValue);

        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/element-values/{id}")
    public ResponseEntity<Void> deleteElementValue(@PathVariable Long id) {
        try {
            elementvaluesService.deleteElementValue(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/positions/descriptions")
    public List<Map<String, String>> getPositionsWithDescriptions(@RequestParam Integer elementnumber) {
        List<ElementvaluesDto> elementValues = elementvaluesService.getElementValuesByElementnumber(elementnumber);
        return elementValues.stream()
                .map(ev -> {
                    Map<String, String> posDesc = new HashMap<>();
                    posDesc.put("position", ev.getPosition());
                    posDesc.put("description_p", ev.getDescription_p());
                    return posDesc;
                })
                .distinct()
                .collect(Collectors.toList());
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/element-values/check-exists")
    public ResponseEntity<Boolean> checkIfCodeExists(
            @RequestParam Integer elementnumber,
            @RequestParam String position,
            @RequestParam String code) {
        boolean exists = elementvaluesService.existsByElementnumberAndPositionAndCode(elementnumber, position, code);
        return ResponseEntity.ok(exists);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/element-values/{id}")
    public ResponseEntity<ElementvaluesDto> updateElementValue(
            @PathVariable Long id,
            @RequestBody ElementvaluesDto elementvaluesDto) {
        try {
            ElementvaluesDto updatedValue = elementvaluesService.updateElementValue(id, elementvaluesDto);
            return ResponseEntity.ok(updatedValue);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/element-values/tags")
    public List<TagsDto> getElementValuesAsTags(
            @RequestParam Integer elementnumber,
            @RequestParam String code) {
        return elementvaluesService.getElementValuesAsTags(elementnumber,code);
    }
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/tags")
    public ResponseEntity<TagsDto> createTag(@RequestBody TagsDto tagsDto) {
        TagsDto createdTag = elementvaluesService.createTag(tagsDto);
        return ResponseEntity.ok(createdTag);
    }

}