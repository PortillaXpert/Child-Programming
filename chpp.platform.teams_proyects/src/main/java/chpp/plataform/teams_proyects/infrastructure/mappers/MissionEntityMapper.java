package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Attachment;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.AttachmentEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionEntity;

import java.util.List;
import java.util.stream.Collectors;

public class MissionEntityMapper {

    public static Mission toDomain(MissionEntity entity) {
        if (entity == null) {
            return null;
        }

        Mission mission = new Mission();
        mission.setId(entity.getId());
        mission.setTitle(entity.getTitle());
        mission.setDescription(entity.getDescription());
        mission.setObjectives(entity.getObjectives());
        mission.setStartDate(entity.getStartDate());
        mission.setEndDate(entity.getEndDate());
        mission.setActive(entity.isActive());

        if (entity.getMaterials() != null) {
            mission.setMaterials(
                    entity.getMaterials().stream()
                            .map(attachment -> {
                                Attachment a = new Attachment();
                                a.setId(attachment.getId());
                                a.setFileName(attachment.getFileName());
                                a.setUrl(attachment.getUrl());

                                return a;
                            })
                            .collect(Collectors.toList())
            );
        }


        return mission;
    }


    public static MissionEntity toEntity(Mission mission) {
        if (mission == null) return null;

        MissionEntity entity = new MissionEntity();
        entity.setId(mission.getId());
        entity.setTitle(mission.getTitle());
        entity.setDescription(mission.getDescription());
        entity.setObjectives(mission.getObjectives());
        entity.setStartDate(mission.getStartDate());
        entity.setEndDate(mission.getEndDate());
        entity.setActive(mission.isActive());

        if (mission.getMaterials() != null) {
            List<AttachmentEntity> attachments = mission.getMaterials().stream()
                    .map(attachment -> {
                        AttachmentEntity attachmentEntity = AttachmentEntityMapper.toEntity(attachment);
                        attachmentEntity.setMission(entity);
                        return attachmentEntity;
                    })
                    .collect(Collectors.toList());

            entity.setMaterials(attachments);
        }

        return entity;
    }

}