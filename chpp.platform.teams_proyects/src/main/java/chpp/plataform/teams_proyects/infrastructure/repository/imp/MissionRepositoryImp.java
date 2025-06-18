package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.MissionEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.JpaMissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Transactional
public class MissionRepositoryImp implements IMissionRepository {

    private final JpaMissionRepository jpaMissionRepository;

    @Override
    public Mission save(Mission mission) {
        MissionEntity entity = MissionEntityMapper.toEntity(mission);
        MissionEntity savedEntity = jpaMissionRepository.save(entity);
        return MissionEntityMapper.toDomain(savedEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Mission> findById(Long id) {
        return jpaMissionRepository.findById(id)
                .map(MissionEntityMapper::toDomain);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mission> findAll() {
        return jpaMissionRepository.findAll().stream()
                .map(MissionEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mission> findByActiveTrue() {
        return jpaMissionRepository.findByActiveTrue().stream()
                .map(MissionEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<Mission> findByActiveFalse() {
        return jpaMissionRepository.findByActiveFalse().stream()
                .map(MissionEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public boolean deactivateMission(Long id) {
        int updatedRows = jpaMissionRepository.updateActiveStatus(id, false);
        return updatedRows > 0;
    }

    @Override
    public boolean activateMission(Long id) {
        int updatedRows = jpaMissionRepository.updateActiveStatus(id, true);
        return updatedRows > 0;
    }

}
