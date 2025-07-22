package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.TaskCompleteDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;

import java.util.List;

public interface IMTAssigmentService {
    ResponseDto<MissionTeamAssignedDTO> createAssignment(MissionTeamAssignedDTO dto);
    ResponseDto<PagedResponseDTO<MissionTeamAssignedDTO>> getAllMissionTeamAssigned(int page, int size);
    ResponseDto<List<MissionTeamAssignedDTO>> findInProgressByTeamId(Long teamId);
    ResponseDto<MissionTeamAssignedDTO> updateTasks(Long assignmentId, List<TaskCompleteDTO> tasks);
    ResponseDto<MissionTeamAssignedDTO> updateStatus(Long assignmentId, AssignmentStatus status);
    ResponseDto<MissionTeamAssignedDTO> getAssignmentById(Long assignmentId);
    ResponseDto<MissionTeamAssignedDTO> update(Long id, MissionTeamAssignedDTO missionTeamAssignedDTO);
    void delete(Long id);
    ResponseDto<List<MissionTeamAssignedDTO>> getByTeamId(Long teamId);
}
