package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;


import java.util.List;

public interface IMTAssigmentRepository {
    MissionTeamAssigment create(MissionTeamAssigment missionTeamAssigment);
    List<MissionTeamAssigment> getAllMissionTeamAssigned();
    List<MissionTeamAssigment> getAssignmentsByTeam(Long teamId);
    MissionTeamAssigment updateTasks(Long assignmentId, List<TaskComplete> tasks);
    MissionTeamAssigment updateStatus(Long assignmentId, AssignmentStatus status);
    MissionTeamAssigment update(Long id,MissionTeamAssigment missionTeamAssigment);
    MissionTeamAssigment getById(Long id);
    void delete(Long id);
}
