package chpp.plataform.teams_proyects.infrastructure.mappers;


import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.infrastructure.entity.MissionTeamAssignedEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.TaskCompleteEntity;

public class TaskEntityMapper {

    public static TaskCompleteEntity toEntity(TaskComplete taskComplete) {
        if (taskComplete == null) return null;

        TaskCompleteEntity entity = new TaskCompleteEntity();
        entity.setId(taskComplete.getId());
        entity.setTitle(taskComplete.getTitle());


        if (taskComplete.getAssignment() != null) {
            MissionTeamAssignedEntity assignmentRef = new MissionTeamAssignedEntity();
            assignmentRef.setId(taskComplete.getAssignment().getId());
            entity.setAssignment(assignmentRef);
        }


        return entity;
    }

    public static TaskComplete toDomain(TaskCompleteEntity entity) {
        if (entity == null) return null;

        return new TaskComplete(
                entity.getId(),
                entity.getTitle(),
               null
        );
    }
}

