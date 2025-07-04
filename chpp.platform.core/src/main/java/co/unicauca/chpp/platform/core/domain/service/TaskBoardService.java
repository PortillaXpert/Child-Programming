package co.unicauca.chpp.platform.core.domain.service;

import org.springframework.stereotype.Service;

import co.unicauca.chpp.platform.core.application.input.ITaskBoardService;
import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.domain.model.exception.TaskBoardException;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.TaskBoardPersistenceAdapter;

/**
 *
 * @author artur
 * POR MODIFICAR
 * Esta clase implementa todos los metodos de la interface
 */

@Service
public class TaskBoardService implements ITaskBoardService {

    private TaskBoardPersistenceAdapter outputPort;
    
    public TaskBoardService(TaskBoardPersistenceAdapter outputPort) {
        this.outputPort = outputPort;
    }

    @Override
    public TaskBoard createTaskBoard(TaskBoard taskBoard) {
        taskBoard = outputPort.saveTaskBoard(taskBoard);
        return taskBoard;
    }

    @Override
    public TaskBoard getTaskBoardById(Long id) {
        return outputPort.getTaskBoardById(id).orElseThrow(()-> new TaskBoardException("TaskBoard not found id:"+id));
    }

    @Override
    public TaskBoard updateTaskBoard(Long id, TaskBoard newTaskBoard) {
        return outputPort.updateTaskBoard( id, newTaskBoard).orElseThrow(()-> new TaskBoardException("TaskBoard not updated id:"+id));
    }

    @Override
    public boolean deleteTaskBoard(Long id) {
        return outputPort.deleteTaskBoard(id);
    }
    
}
