package hsid.demo.HSID_Backend.Service.Impl;

import hsid.demo.HSID_Backend.Dtos.ProtocoleDto;
import hsid.demo.HSID_Backend.Entities.Protocole;
import hsid.demo.HSID_Backend.Mappers.ProtocoleMapper;
import hsid.demo.HSID_Backend.Repository.ProtocoleRepository;
import hsid.demo.HSID_Backend.Service.ProtocoleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProtocoleServiceImpl implements ProtocoleService {
    private final ProtocoleRepository protocoleRepository;

    @Override
    public List<ProtocoleDto> getProtocoles() {
        List<Protocole> protocoles = protocoleRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        return protocoles.stream().map(ProtocoleMapper::mapToProtocoleDto)
                .collect(Collectors.toList());
    }


    @Override
    public ProtocoleDto getProtocoleById(String nomprotocole) {
        Protocole protocole = protocoleRepository.findBynomprotocole(nomprotocole);
        if (protocole == null) {
            throw new EntityNotFoundException("Protocole not found with name: " + nomprotocole);
        }
        return ProtocoleMapper.mapToProtocoleDto(protocole);
    }

    @Override
    public ProtocoleDto addProtocole(ProtocoleDto protocoleDto) {
        Protocole protocole = ProtocoleMapper.mapToProtocole(protocoleDto);
        Protocole savedProtocole = protocoleRepository.save(protocole);
        return ProtocoleMapper.mapToProtocoleDto(savedProtocole);
    }


    @Override
    public void deleteProtocole(Long id) {
        if (!protocoleRepository.existsById(id)) {
            throw new EntityNotFoundException("Protocole not found with id: " + id);
        }
        protocoleRepository.deleteById(id);
    }

    @Override
    public ProtocoleDto updateProtocole(Long id, ProtocoleDto protocoleDto) {
        Protocole existingProtocole = protocoleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Protocole not found with id: " + id));
        existingProtocole.setNomprotocole(protocoleDto.getNomprotocole());
        existingProtocole.setDescription(protocoleDto.getDescription());
        existingProtocole.setVersion(protocoleDto.getVersion());
        Protocole updatedProtocole = protocoleRepository.save(existingProtocole);
        return ProtocoleMapper.mapToProtocoleDto(updatedProtocole);
    }


}
