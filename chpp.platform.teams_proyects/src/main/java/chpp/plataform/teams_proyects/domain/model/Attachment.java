package chpp.plataform.teams_proyects.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attachment {
    private Long id;
    private String fileName;
    private String url;
    private Long missionId;
}