package co.unicauca.chpp.platform.core.infraestructure.input.rest.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request.TaskRequest;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response.TaskDTO;

@Mapper(componentModel = "spring")
public interface TaskRestMapper {
    
    TaskRestMapper INSTANCE = Mappers.getMapper(TaskRestMapper.class);

    Task toTask(TaskRequest taskResquest);
    TaskDTO toTaskDTO(Task task);
    List<TaskDTO> toListTaskDTO(List<Task> tasks);
    List<Task> toListTasks (List<TaskDTO> tasks);
}
