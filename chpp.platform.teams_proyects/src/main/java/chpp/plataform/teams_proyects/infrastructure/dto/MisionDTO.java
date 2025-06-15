package chpp.plataform.teams_proyects.infrastructure.dto;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MisionDTO {
    private Long id;
    private String title;
    private String description;
    private List<String> objectives;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private List<TeamDTO> teams;
    private List<AttachmentDTO> materials;
}
