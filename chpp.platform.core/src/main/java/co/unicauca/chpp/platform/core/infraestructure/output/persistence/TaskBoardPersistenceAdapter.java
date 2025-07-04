package co.unicauca.chpp.platform.core.infraestructure.output.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import co.unicauca.chpp.platform.core.application.output.TaskBoardOutputPort;
import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskBoardEntity;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper.TaskBoardPersistenceMapper;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper.TaskPersistenceMapper;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.repository.TaskBoardRepository;

/**
 *
 * @author artur
 */

@Component
public class TaskBoardPersistenceAdapter implements TaskBoardOutputPort{
    
    private final TaskBoardRepository taskBoardRepository;
    
    private final TaskBoardPersistenceMapper taskBoardPersistenceMapper;

    private final TaskPersistenceMapper taskPersistenceMapper;

    public TaskBoardPersistenceAdapter(TaskBoardRepository taskBoardRepository, TaskBoardPersistenceMapper taskBoardPersistenceMapper, TaskPersistenceMapper taskPersistenceMapper) {
        this.taskBoardRepository = taskBoardRepository;
        this.taskBoardPersistenceMapper = taskBoardPersistenceMapper;
        this.taskPersistenceMapper = taskPersistenceMapper;
    }

    @Override
    public TaskBoard saveTaskBoard(TaskBoard taskBoard) {
        
        TaskBoardEntity taskBoardEntity = taskBoardPersistenceMapper.toTaskBoardEntity(taskBoard);
        taskBoardRepository.save(taskBoardEntity);
        return taskBoardPersistenceMapper.toTaskBoard(taskBoardEntity);
        
    }

    @Override
    public Optional<TaskBoard> getTaskBoardById(Long id) {
       
        Optional<TaskBoardEntity> taskBoardEntity = taskBoardRepository.findById(id);
        if(taskBoardEntity.isEmpty()){
            return Optional.empty();
        }
        TaskBoard taskBoard = taskBoardPersistenceMapper.toTaskBoard(taskBoardEntity.get());
        return Optional.of(taskBoard);
        
    }

    @Override
    public Optional<List<Task>> getAllTasks(Long id) {
        Optional<TaskBoard> taskBoard = getTaskBoardById(id);
        
        if(taskBoard.isEmpty()){
            return Optional.empty();
        }
        List<Task> tasks = taskBoard.get().getTasks();
        return Optional.of(tasks);
    }

    @Override
    public Optional<TaskBoard> updateTaskBoard( Long id, TaskBoard taskBoard) {
       
        Optional<TaskBoardEntity> taskBoardEntity = taskBoardRepository.findById(id);
        
        if(taskBoardEntity.isEmpty()){
            return Optional.empty();
        }

        TaskBoardEntity newTaskBoardEntity = taskBoardEntity.get();
        newTaskBoardEntity.setName(taskBoard.getName());
        newTaskBoardEntity.setDescription(taskBoard.getDescription());
        if(taskBoard.getTasks() != null){
            newTaskBoardEntity.setTasks(taskPersistenceMapper.toTaskEntities(taskBoard.getTasks()));
        }
        newTaskBoardEntity = taskBoardRepository.save(newTaskBoardEntity);
        TaskBoard updated = taskBoardPersistenceMapper.toTaskBoard(newTaskBoardEntity);
        return Optional.of(updated);
    }

    @Override
    public boolean deleteTaskBoard(Long id) {
        Optional<TaskBoardEntity> taskBoardEntity = taskBoardRepository.findById(id);

        if(taskBoardEntity.isEmpty()){
            return false;
        }

        taskBoardRepository.deleteById(id);
        return true;
    }
    
}
