package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;

import java.util.List;

public interface IMTAssigmentService {
    ResponseDto<MissionTeamAssignedDTO> createAssignment(MissionTeamAssignedDTO dto);
    ResponseDto<List<MissionTeamAssignedDTO>> getAllMissionTeamAssigned();
    ResponseDto<List<MissionTeamAssignedDTO>> getAssignmentsByTeam(Long teamId);
    ResponseDto<MissionTeamAssignedDTO> updateTasks(Long assignmentId, List<TaskComplete> tasks);
    ResponseDto<MissionTeamAssignedDTO> updateStatus(Long assignmentId, AssignmentStatus status);
    ResponseDto<MissionTeamAssignedDTO> getAssignmentById(Long assignmentId);
    ResponseDto<MissionTeamAssignedDTO> update(Long id, MissionTeamAssignedDTO missionTeamAssignedDTO);
    void delete(Long id);
}
