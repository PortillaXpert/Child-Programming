package co.unicauca.chpp.platform.core.domain.service;

import org.springframework.stereotype.Service;

import co.unicauca.chpp.platform.core.application.input.ITaskService;
import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.domain.model.exception.TaskException;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.TaskPersistenceAdapter;

@Service
public class TaskService implements ITaskService{

    private TaskPersistenceAdapter outputPort;


    public TaskService(TaskPersistenceAdapter outputPort) {
        this.outputPort = outputPort;
    }

    @Override
    public Task createTask(Task task) {
        task = outputPort.saveTask(task);
        return task;
    }

    @Override
    public Task getTaskById(long id) {
        return outputPort.getTaskById(id).orElseThrow(()-> new TaskException("Task not found id:" + id));
    }

    @Override
    public Task updateTask(long id, Task task) {
        return outputPort.updateTask(task, id).orElseThrow(()-> new TaskException("Task not found id:" + id));
    }

    @Override
    public boolean deleteTask(long id) {
        return outputPort.deleteTask(id);
    }
    
}
