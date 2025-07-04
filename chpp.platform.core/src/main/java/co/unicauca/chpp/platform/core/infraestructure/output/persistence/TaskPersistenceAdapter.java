package co.unicauca.chpp.platform.core.infraestructure.output.persistence;

import java.util.Optional;

import org.springframework.stereotype.Component;

import co.unicauca.chpp.platform.core.application.output.TaskOutputPort;
import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskEntity;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper.TaskPersistenceMapper;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.repository.TaskRepository;

@Component
public class TaskPersistenceAdapter implements TaskOutputPort{

    private final TaskRepository taskRepository;

    private final TaskPersistenceMapper taskPersistenceMapper;


    public TaskPersistenceAdapter(TaskRepository taskRepository, TaskPersistenceMapper taskPersistenceMapper) {
        this.taskRepository = taskRepository;
        this.taskPersistenceMapper = taskPersistenceMapper;
    }

    @Override
    public Task saveTask(Task task) {
        TaskEntity taskEntity = taskPersistenceMapper.toTaskEntity(task);
        taskRepository.save(taskEntity);
        return taskPersistenceMapper.toTask(taskEntity);
    }

    @Override
    public Optional<Task> getTaskById(long id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if(taskEntity.isEmpty()){
            return Optional.empty();
        }
        Task task = taskPersistenceMapper.toTask(taskEntity.get());
        return Optional.of(task);
    }

    @Override
    public Optional<Task> updateTask(Task task, long id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if(taskEntity.isEmpty()){
            return Optional.empty();
        }
        TaskEntity newTaskEntity = taskPersistenceMapper.toTaskEntity(task);
        newTaskEntity.setId(id);
        taskRepository.save(newTaskEntity);
        Task updated = taskPersistenceMapper.toTask(newTaskEntity);
        return Optional.of(updated);
    }

    @Override
    public boolean deleteTask(long id) {
        Optional<TaskEntity> taskEntity = taskRepository.findById(id);
        if(taskEntity.isEmpty()){
            return false;
        }

        taskRepository.deleteById(id);
        return true;
    }
    
}
