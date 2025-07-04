package co.unicauca.chpp.platform.core.application.input;

import co.unicauca.chpp.platform.core.domain.model.Task;

public interface ITaskService {
    
    Task createTask(Task task);
    Task getTaskById(long id);
    Task updateTask(long id, Task task);
    boolean deleteTask(long id);
    
}
