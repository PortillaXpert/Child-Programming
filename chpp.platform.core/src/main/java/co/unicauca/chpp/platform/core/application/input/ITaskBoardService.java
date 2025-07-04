package co.unicauca.chpp.platform.core.application.input;

import co.unicauca.chpp.platform.core.domain.model.TaskBoard;

/**
 *
 * @author artur
*/

public interface ITaskBoardService {
    
    TaskBoard createTaskBoard(TaskBoard taskBoard);
    TaskBoard getTaskBoardById(Long id);
    TaskBoard updateTaskBoard(Long id, TaskBoard newTaskBoard);
    boolean deleteTaskBoard(Long id);
    
}
