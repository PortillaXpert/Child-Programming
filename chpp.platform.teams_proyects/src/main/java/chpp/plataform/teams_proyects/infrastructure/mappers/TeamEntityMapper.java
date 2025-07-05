package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.TeamEntity;

import java.util.stream.Collectors;

public class TeamEntityMapper {

    public static TeamEntity toEntity(Team team) {
        if (team == null) return null;

        return TeamEntity.builder()
                .id(team.getId())
                .name(team.getName())
                .course(team.getCourse())
                .students(team.getStudents() != null ?
                        team.getStudents().stream()
                                .map(StudentEntityMapper::toEntity)
                                .collect(Collectors.toList()) : null)
                .build();
    }

    public static Team toDomain(TeamEntity entity) {
        if (entity == null) return null;

        return new Team(
                entity.getId(),
                entity.getName(),
                entity.getCourse(),
                entity.getStudents() != null ?
                        entity.getStudents().stream()
                                .map(StudentEntityMapper::toDomain)
                                .collect(Collectors.toList()) : null,
                entity.isActive()
        );
    }
}