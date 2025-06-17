package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.infrastructure.entity.MissionEntity;
import java.util.stream.Collectors;

public class MissionEntityMapper {

    public static Mission toDomain(MissionEntity entity) {
        return new Mission(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getObjectives(),
                entity.getStartDate(),
                entity.getEndDate(),
                entity.isActive(),
                entity.getMaterials() != null ?
                        entity.getMaterials().stream()
                                .map(AttachmentEntityMapper::toDomain)
                                .collect(Collectors.toList())
                        : null
        );
    }

    public static MissionEntity toEntity(Mission mission) {
        MissionEntity entity = new MissionEntity();
        entity.setId(mission.getId());
        entity.setTitle(mission.getTitle());
        entity.setDescription(mission.getDescription());
        entity.setObjectives(mission.getObjectives());
        entity.setStartDate(mission.getStartDate());
        entity.setEndDate(mission.getEndDate());
        entity.setActive(mission.isActive());
        return entity;
    }

}