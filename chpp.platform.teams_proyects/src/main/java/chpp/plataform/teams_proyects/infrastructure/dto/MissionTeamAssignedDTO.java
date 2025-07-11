package chpp.plataform.teams_proyects.infrastructure.dto;

import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MissionTeamAssignedDTO {
    private Long id;
    private String titleMission;
    private Long missionId;
    private Long teamId;
    private String teamName;
    private String teamCourse;
    private AssignmentStatus status;
    private List<TaskComplete> tasksCompleted;
}
