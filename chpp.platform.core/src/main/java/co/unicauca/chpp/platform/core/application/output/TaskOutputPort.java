package co.unicauca.chpp.platform.core.application.output;

import java.util.Optional;

import co.unicauca.chpp.platform.core.domain.model.Task;

public interface TaskOutputPort {
    
    Task saveTask(Task task);
    Optional<Task> getTaskById(long id);
    Optional<Task> updateTask(Task task, long id);
    boolean deleteTask(long id);
    
}
