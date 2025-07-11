package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import org.springframework.stereotype.Component;

@Component
public class MissionTAMapper {

    public static MissionTeamAssigment toDomain(MissionTeamAssignedDTO dto) {
        if (dto == null) {
            return null;
        }

        MissionTeamAssigment domain = new MissionTeamAssigment();
        domain.setId(dto.getId());


        Mission mission = new Mission();
        mission.setId(dto.getMissionId());
        mission.setTitle(dto.getTitleMission());
        domain.setMission(mission);

        Team team = new Team();
        team.setId(dto.getTeamId());
        domain.setTeam(team);
        domain.setTasksCompleted(dto.getTasksCompleted());
        domain.setStatus(dto.getStatus());

        return domain;
    }

    public static MissionTeamAssignedDTO toDTO(MissionTeamAssigment domain) {
        if (domain == null) {
            return null;
        }

        MissionTeamAssignedDTO dto = new MissionTeamAssignedDTO();
        dto.setId(domain.getId());

        if (domain.getMission() != null) {
            dto.setMissionId(domain.getMission().getId());
            dto.setTitleMission(domain.getMission().getTitle());
        }

        if (domain.getTeam() != null) {
            dto.setTeamId(domain.getTeam().getId());
            dto.setTeamName(domain.getTeam().getName());
            dto.setTeamCourse(domain.getTeam().getCourse());
        }

        dto.setStatus(domain.getStatus());
        dto.setTasksCompleted(domain.getTasksCompleted());

        return dto;
    }
}