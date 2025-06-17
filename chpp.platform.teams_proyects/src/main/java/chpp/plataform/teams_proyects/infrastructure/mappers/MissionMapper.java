package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;

import java.util.stream.Collectors;

public class MissionMapper {

    public static MisionDTO toDTO(Mission mission) {
        return new MisionDTO(
                mission.getId(),
                mission.getTitle(),
                mission.getDescription(),
                mission.getObjectives(),
                mission.getStartDate(),
                mission.getEndDate(),
                mission.getMaterials() != null ?
                        mission.getMaterials().stream()
                                .map(AttachmentMapper::toDTO)
                                .collect(Collectors.toList())
                        : null
        );
    }

    public static Mission toDomain(MisionDTO dto) {
        return new Mission(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getObjectives(),
                dto.getStartDate(),
                dto.getEndDate(),
                true,
                dto.getMaterials() != null ?
                        dto.getMaterials().stream()
                                .map(AttachmentMapper::toDomain)
                                .collect(Collectors.toList())
                        : null
        );
    }
}
