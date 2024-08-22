package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.TagsDto;
import hsid.demo.HSID_Backend.Entities.Tags;

public class TagsMapper {

    public static TagsDto mapToTagsDto(Tags tags) {
        return new TagsDto(
                tags.getId(),
                tags.getElementNumber(),
                tags.getTag(),
                tags.getNom(), // Ensure this is correctly mapped
                tags.getLongueur(),
                tags.getFormat(),
                tags.getDescription(),
                tags.getNomprotocole()
        );
    }



    public static Tags mapToTags(TagsDto tagsDto) {
        Tags tags = new Tags();
        tags.setId(tagsDto.getId());
        tags.setElementNumber(tagsDto.getElementNumber());
        tags.setTag(tagsDto.getTag());
        tags.setNom(tagsDto.getNom());
        tags.setLongueur(tagsDto.getLongueur());
        tags.setFormat(tagsDto.getFormat());
        tags.setDescription(tagsDto.getDescription());
        tags.setNomprotocole(tagsDto.getNomprotocole());
        return tags;
    }
}
