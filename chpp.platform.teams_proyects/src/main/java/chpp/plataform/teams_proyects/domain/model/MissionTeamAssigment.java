package chpp.plataform.teams_proyects.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MissionTeamAssigment {
    private Long id;
    private String title;
    private Team team;
    private Mission mission;
    private List<TaskComplete> tasksCompleted;
    private AssignmentStatus status;
}
