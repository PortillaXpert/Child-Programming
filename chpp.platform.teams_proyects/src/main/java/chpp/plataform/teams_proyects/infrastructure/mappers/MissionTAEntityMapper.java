package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionTeamAssignedEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.TaskCompleteEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class MissionTAEntityMapper {

    public static MissionTeamAssignedEntity toEntity(MissionTeamAssigment assignment) {
        if (assignment == null) return null;

        MissionTeamAssignedEntity entity = MissionTeamAssignedEntity.builder()
                .id(assignment.getId())
                .team(assignment.getTeam() != null ? TeamEntityMapper.toEntity(assignment.getTeam()) : null)
                .mission(assignment.getMission() != null ? MissionEntityMapper.toEntity(assignment.getMission()) : null)
                .status(assignment.getStatus())
                .build();

        if (assignment.getTasksCompleted() != null) {
            List<TaskCompleteEntity> taskEntities = assignment.getTasksCompleted().stream()
                    .map(task -> {
                        TaskCompleteEntity taskEntity = TaskEntityMapper.toEntity(task);
                        taskEntity.setAssignment(entity);
                        return taskEntity;
                    })
                    .collect(Collectors.toList());

            entity.setCompletedTasks(taskEntities);
        }

        return entity;
    }

    public MissionTeamAssigment toDomain(MissionTeamAssignedEntity entity) {
        if (entity == null) return null;

        List<TaskComplete> taskList = entity.getCompletedTasks() != null
                ? entity.getCompletedTasks().stream()
                .map(TaskEntityMapper::toDomain)
                .collect(Collectors.toList())
                : null;

        return new MissionTeamAssigment(
                entity.getId(),
                entity.getMission() != null ? entity.getMission().getTitle() : null,
                entity.getTeam() != null ? TeamEntityMapper.toDomain(entity.getTeam()) : null,
                entity.getMission() != null ? MissionEntityMapper.toDomain(entity.getMission()) : null,
                taskList,
                entity.getStatus()
        );
    }
}