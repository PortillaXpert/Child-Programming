package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface IMTAssigmentRepository {
    MissionTeamAssigment create(MissionTeamAssigment missionTeamAssigment);
    Page<MissionTeamAssigment> getAllMissionTeamAssigned(Pageable pageable);
    List<MissionTeamAssigment> findInProgressByTeamId(Long teamId);
    MissionTeamAssigment updateTasks(Long assignmentId, List<TaskComplete> tasks);
    MissionTeamAssigment updateStatus(Long assignmentId, AssignmentStatus status);
    MissionTeamAssigment update(Long id,MissionTeamAssigment missionTeamAssigment);
    MissionTeamAssigment getById(Long id);
    List<MissionTeamAssigment> getByTeamId(Long teamId);
    void delete(Long id);
}
