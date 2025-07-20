package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.AttachmentEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.AttachmentEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.JpaMissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class MissionRepositoryImp implements IMissionRepository {

    private final JpaMissionRepository jpaMissionRepository;

    @Override
    public Mission save(Mission mission) {
        MissionEntity entity = MissionEntityMapper.toEntity(mission);
        entity.setActive(true);
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
    public Page<Mission> findAll(Pageable pageable) {
        return jpaMissionRepository.findAll(pageable).map(MissionEntityMapper::toDomain);
    }

    @Override
    public Page<Mission> findByActiveTrue(Pageable pageable) {
        return jpaMissionRepository.findByActiveTrue(pageable).map(MissionEntityMapper::toDomain);
    }

    @Override
    public Page<Mission> findByActiveFalse(Pageable pageable) {
        return jpaMissionRepository.findByActiveFalse(pageable).map(MissionEntityMapper::toDomain);
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


    @Override
    public Mission update(Long id, Mission mission) {
        Optional<MissionEntity> optionalEntity = jpaMissionRepository.findById(id);
        if (optionalEntity.isEmpty()) {
            return null;
        }

        MissionEntity entity = optionalEntity.get();
        entity.setTitle(mission.getTitle());
        entity.setDescription(mission.getDescription());
        entity.setObjectives(mission.getObjectives());
        entity.setStartDate(mission.getStartDate());
        entity.setEndDate(mission.getEndDate());
        entity.setActive(mission.isActive());

        List<AttachmentEntity> actuales = entity.getMaterials();
        List<AttachmentEntity> nuevos = mission.getMaterials()
                .stream()
                .map(dto -> {
                    AttachmentEntity nuevo = AttachmentEntityMapper.toEntity(dto);
                    nuevo.setMission(entity);
                    return nuevo;
                })
                .toList();

        actuales.removeIf(actual ->
                nuevos.stream().noneMatch(nuevo
                        -> Objects.equals(nuevo.getId(), actual.getId()))
        );

        for (AttachmentEntity nuevo : nuevos) {
            boolean yaExiste = actuales.stream()
                    .anyMatch(actual -> Objects.equals(actual.getId(), nuevo.getId()));
            if (!yaExiste) {
                actuales.add(nuevo);
            }
        }

        MissionEntity updatedEntity = jpaMissionRepository.save(entity);
        return MissionEntityMapper.toDomain(updatedEntity);
    }


}
