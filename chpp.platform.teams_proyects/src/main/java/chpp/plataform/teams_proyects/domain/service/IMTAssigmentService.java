package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;

import java.util.List;

public interface IMTAssigmentService {
    MissionTeamAssignedDTO createAssignment(MissionTeamAssignedDTO dto);
    List<MissionTeamAssignedDTO> getAllMissionTeamAssigned();
    List<MissionTeamAssignedDTO> getAssignmentsByTeam(Long teamId);
    MissionTeamAssignedDTO updateTasks(Long assignmentId, List<TaskComplete> tasks);
    MissionTeamAssignedDTO updateStatus(Long assignmentId, AssignmentStatus status);
}
