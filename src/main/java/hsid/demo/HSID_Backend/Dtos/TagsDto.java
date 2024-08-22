package hsid.demo.HSID_Backend.Dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TagsDto {
 Long id;
 Integer elementNumber;
 String tag;
 String nom;
 String longueur;
 String format;
 String description;
 String nomprotocole;
}

