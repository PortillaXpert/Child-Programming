package chpp.plataform.teams_proyects.infrastructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskCompleteDTO {
    private Long id;
    private String title;
    private Long assignmentId;
}
