package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Attachment;
import chpp.plataform.teams_proyects.infrastructure.dto.AttachmentDTO;

public class AttachmentMapper {

    public static AttachmentDTO toDTO(Attachment attachment) {
        return new AttachmentDTO(
                attachment.getId(),
                attachment.getFileName(),
                attachment.getUrl());
    }

    public static Attachment toDomain(AttachmentDTO dto) {
        return new Attachment(
                dto.getId(),
                dto.getFileName(),
                dto.getUrl(), null
        );
    }
}
