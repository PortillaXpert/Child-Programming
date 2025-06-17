package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;


import java.util.stream.Collectors;

public class TeamMapper {

    public static TeamDTO toDTO(Team team) {
        return new TeamDTO(
                team.getId(),
                team.getName(),
                team.getCourse(),
                team.getStudents() != null ?
                        team.getStudents().stream()
                                .map(StudentMapper::toDTO)
                                .collect(Collectors.toList())
                        : null

        );
    }

    public static Team toDomain(TeamDTO dto) {
        return new Team(
                dto.getId(),
                dto.getName(),
                dto.getCourse(),
                dto.getStudents() != null ?
                        dto.getStudents().stream()
                                .map(StudentMapper::toDomain)
                                .collect(Collectors.toList())
                        : null
        );
    }


}