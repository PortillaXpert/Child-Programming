package co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskEntity;

@Mapper(componentModel = "spring")
public interface TaskPersistenceMapper {
    
    TaskPersistenceMapper INSTANCE = Mappers.getMapper(TaskPersistenceMapper.class);

    TaskEntity toTaskEntity(Task task);
    Task toTask(TaskEntity taskEntity);
    List<Task> toListTasks(List<TaskEntity> taskEntities);
    List<TaskEntity> toTaskEntities(List<Task> tasks);

}
