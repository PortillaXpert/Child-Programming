package chpp.plataform.teams_proyects.infrastructure.mappers;


import chpp.plataform.teams_proyects.domain.model.Attachment;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.AttachmentEntity;

public class AttachmentEntityMapper {

    public static Attachment toDomain(AttachmentEntity entity) {
        return new Attachment(
                entity.getId(),
                entity.getFileName(),
                entity.getUrl(),
                entity.getMission() != null ? MissionEntityMapper.toDomain(entity.getMission()) : null
        );
    }

    public static AttachmentEntity toEntity(Attachment attachment) {
        AttachmentEntity entity = new AttachmentEntity();
        entity.setId(attachment.getId());
        entity.setFileName(attachment.getFileName());
        entity.setUrl(attachment.getUrl());

        if (attachment.getMission() != null) {
            entity.setMission(MissionEntityMapper.toEntity(attachment.getMission()));
        }

        return entity;
    }
}