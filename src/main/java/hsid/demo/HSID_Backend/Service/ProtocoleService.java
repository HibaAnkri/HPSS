package hsid.demo.HSID_Backend.Service;

import hsid.demo.HSID_Backend.Dtos.ProtocoleDto;

import java.util.List;

public interface ProtocoleService {
    List<ProtocoleDto> getProtocoles();
    ProtocoleDto getProtocoleById(String nomprotocole);
    ProtocoleDto addProtocole(ProtocoleDto protocoleDto);
    void deleteProtocole(Long id);
    ProtocoleDto updateProtocole(Long id, ProtocoleDto protocoleDto);
}
