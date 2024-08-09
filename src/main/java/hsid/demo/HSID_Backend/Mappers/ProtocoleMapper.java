package hsid.demo.HSID_Backend.Mappers;

import hsid.demo.HSID_Backend.Dtos.ProtocoleDto;
import hsid.demo.HSID_Backend.Entities.Protocole;

public class ProtocoleMapper {
    public static ProtocoleDto mapToProtocoleDto(Protocole protocole){
        return new ProtocoleDto(
                protocole.getId(),
                protocole.getNomprotocole(),
                protocole.getDescription(),
                protocole.getVersion()
        );
    }

    public static Protocole mapToProtocole(ProtocoleDto protocoleDto) {
        Protocole protocole = new Protocole();
        protocole.setId(protocoleDto.getId()); // Assigner l'ID à partir du DTO
        protocole.setNomprotocole(protocoleDto.getNomprotocole());
        protocole.setDescription(protocoleDto.getDescription());
        protocole.setVersion(protocoleDto.getVersion());
        return protocole;
    }
}
