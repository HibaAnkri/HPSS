package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Dtos.ElementvaluesDto;
import hsid.demo.HSID_Backend.Dtos.TagsDto;
import hsid.demo.HSID_Backend.Entities.Elementvalues;
import hsid.demo.HSID_Backend.Entities.Messages;
import hsid.demo.HSID_Backend.Entities.Tags;
import hsid.demo.HSID_Backend.Mappers.ElementvaluesMapper;
import hsid.demo.HSID_Backend.Mappers.TagsMapper;
import hsid.demo.HSID_Backend.Repository.ElementvaluesRepository;
import hsid.demo.HSID_Backend.Repository.MessagesRepository;
import hsid.demo.HSID_Backend.Repository.TagsRepository;
import hsid.demo.HSID_Backend.Service.ElementvaluesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ElementvaluesServiceImpl implements ElementvaluesService {

    @Autowired
    private ElementvaluesRepository elementvaluesRepository;

    @Autowired
    private MessagesRepository messagesRepository;
    @Autowired
    private TagsRepository tagsRepository;

    @Override
    public List<ElementvaluesDto> getElementValuesByElementnumberAndNomprotocole(Integer elementnumber, String nomprotocole) {
        List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumberAndNomprotocole(elementnumber, nomprotocole);
        return elementValues.stream()
                .filter(ev -> ev.getElementnumber() != null)
                .map(ElementvaluesMapper::mapToElementValueDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ElementvaluesDto> getElementValuesByElementnumberAndCode(Integer elementnumber, String code) {
        Messages message = messagesRepository.findByCode(code);
        if (message != null) {
            boolean exists = elementvaluesRepository.existsByElementnumberAndNomprotocole(elementnumber, message.getNomprotocole());
            if (exists) {
                List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumber(elementnumber);
                return elementValues.stream()
                        .filter(ev -> ev.getElementnumber() != null)
                        .filter(ev -> ev.getNomprotocole().equals(message.getNomprotocole()))
                        .map(ElementvaluesMapper::mapToElementValueDto)
                        .collect(Collectors.toList());
            } else {
                return Collections.emptyList();
            }
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<ElementvaluesDto> getElementValuesByElementnumberCodeAndPosition(Integer elementnumber, String code, String position) {
        Messages message = messagesRepository.findByCode(code);
        if (message != null) {
            boolean exists = elementvaluesRepository.existsByElementnumberAndNomprotocole(elementnumber, message.getNomprotocole());
            if (exists) {
                List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumberAndPosition(elementnumber, position);
                return elementValues.stream()
                        .filter(ev -> ev.getElementnumber() != null)
                        .filter(ev -> ev.getNomprotocole().equals(message.getNomprotocole()))
                        .map(ElementvaluesMapper::mapToElementValueDto)
                        .collect(Collectors.toList());
            } else {
                return Collections.emptyList();
            }
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<ElementvaluesDto> getElementValuesByCode(String code) {
        Messages message = messagesRepository.findByCode(code);
        if (message != null) {
            List<Elementvalues> elementValues = elementvaluesRepository.findByNomprotocole(message.getNomprotocole());
            return elementValues.stream()
                    .filter(ev -> ev.getElementnumber() != null)
                    .map(ElementvaluesMapper::mapToElementValueDto)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    @Override
    public List<ElementvaluesDto> getElementValuesByElementnumber(Integer elementnumber) {
        List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumber(elementnumber);
        return elementValues.stream()
                .filter(ev -> ev.getElementnumber() != null)
                .map(ElementvaluesMapper::mapToElementValueDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ElementvaluesDto> getElementValuesByElementnumberAndPosition(Integer elementnumber, String position) {
        List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumberAndPosition(elementnumber, position);
        return elementValues.stream()
                .filter(ev -> ev.getElementnumber() != null)
                .map(ElementvaluesMapper::mapToElementValueDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getPositionsByElementnumber(Integer elementnumber) {
        List<Elementvalues> elementValues = elementvaluesRepository.findByElementnumber(elementnumber);
        return elementValues.stream()
                .map(Elementvalues::getPosition)
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public List<Elementvalues> findByProtocolServiceAndServicecode(String nomprotocole, String service, String servicecode) {
        return elementvaluesRepository.findByNomprotocoleAndServiceAndServicecode(nomprotocole, service, servicecode);
    }


    @Override
    public ElementvaluesDto createElementValue(ElementvaluesDto elementvaluesDto) {

        Elementvalues elementValue = ElementvaluesMapper.mapToElementValue(elementvaluesDto);

        Elementvalues savedElementValue = elementvaluesRepository.save(elementValue);

        return ElementvaluesMapper.mapToElementValueDto(savedElementValue);
    }
    public void deleteElementValue(Long id) {
        Optional<Elementvalues> elementValue = elementvaluesRepository.findById(id);
        if (elementValue.isPresent()) {
            elementvaluesRepository.deleteById(id);
        } else {
            throw new RuntimeException("Element value not found");
        }
    }

    @Override
    public boolean existsByElementnumberAndPositionAndCode(Integer elementnumber, String position, String code) {
        return elementvaluesRepository.existsByElementnumberAndPositionAndCode(elementnumber, position, code);
    }
    @Override
    public ElementvaluesDto updateElementValue(Long id, ElementvaluesDto elementvaluesDto) {
        Optional<Elementvalues> existingElement = elementvaluesRepository.findById(id);
        if (existingElement.isPresent()) {
            Elementvalues elementToUpdate = existingElement.get();
            elementToUpdate.setElementnumber(elementvaluesDto.getElementnumber());
            elementToUpdate.setPosition(elementvaluesDto.getPosition());
            elementToUpdate.setDescription_p(elementvaluesDto.getDescription_p());
            elementToUpdate.setCode(elementvaluesDto.getCode());
            elementToUpdate.setDescription_c(elementvaluesDto.getDescription_c());
            elementToUpdate.setIn_message(elementvaluesDto.getIn_message());
            elementToUpdate.setNomprotocole(elementvaluesDto.getNomprotocole());
            elementToUpdate.setService(elementvaluesDto.getService());
            elementToUpdate.setServicecode(elementvaluesDto.getServicecode());

            Elementvalues updatedElement = elementvaluesRepository.save(elementToUpdate);
            return ElementvaluesMapper.mapToElementValueDto(updatedElement);
        } else {
            throw new RuntimeException("Element value not found");
        }
    }


    @Override
    public List<TagsDto> getElementValuesAsTags(Integer elementnumber, String code) {
        List<Elementvalues> elementValues;
        List<Tags> tags;

        if (code.startsWith("H_")) {
            // Rechercher dans element_values et tags pour HSID
            elementValues = elementvaluesRepository.findByElementnumberAndNomprotocoleAndCode(elementnumber, "HSID", code);
            tags = tagsRepository.findByElementNumberAndNomprotocole(elementnumber, "HSID");
        } else if (code.startsWith("M_")) {
            // Rechercher dans element_values et tags pour MSID
            elementValues = elementvaluesRepository.findByElementnumberAndNomprotocoleAndCode(elementnumber, "MSID", code);
            tags = tagsRepository.findByElementNumberAndNomprotocole(elementnumber, "MSID");
        } else {
            // Si le code ne correspond ni à HSID ni à MSID, retourner une liste vide ou une erreur
            return new ArrayList<>();
        }

        List<TagsDto> results = new ArrayList<>();

        // Ajouter les résultats element_values au résultat final
        for (Elementvalues ev : elementValues) {
            TagsDto tag = new TagsDto();
            tag.setElementNumber(ev.getElementnumber());
            tag.setNomprotocole(ev.getNomprotocole());
            tag.setTag(ev.getCode());
            tag.setDescription(ev.getDescription_p());
            tag.setLongueur(ev.getPosition());
            tag.setFormat(ev.getServicecode());

            results.add(tag);
        }

        // Ajouter les résultats tags au résultat final
        for (Tags tagEntity : tags) {
            TagsDto tag = new TagsDto();
            tag.setElementNumber(tagEntity.getElementNumber());
            tag.setNomprotocole(tagEntity.getNomprotocole());
            tag.setTag(tagEntity.getTag());
            tag.setDescription(tagEntity.getDescription());
            tag.setLongueur(tagEntity.getLongueur());
            tag.setFormat(tagEntity.getFormat());
            tag.setNom(tagEntity.getNom());  // Assurez-vous d'ajouter cette ligne pour définir le nom

            results.add(tag);
        }

        return results;
    }


    @Override
    public TagsDto createTag(TagsDto tagsDto) {
        Tags newTag = TagsMapper.mapToTags(tagsDto);
        Tags savedTag = tagsRepository.save(newTag);
        return TagsMapper.mapToTagsDto(savedTag);
    }


}