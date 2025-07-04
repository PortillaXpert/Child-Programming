package co.unicauca.chpp.platform.core.application.output;

import java.util.List;
import java.util.Optional;

import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.domain.model.TaskBoard;

/**
 *
 * @author artur
 */
public interface TaskBoardOutputPort {
    
    TaskBoard saveTaskBoard(TaskBoard taskBoard);
    
    Optional<TaskBoard> getTaskBoardById (Long id);
    Optional<List<Task>> getAllTasks (Long id);
    Optional<TaskBoard> updateTaskBoard( Long id,TaskBoard taskBoard);
    boolean deleteTaskBoard(Long id);
}
