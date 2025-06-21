package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.TaskComplete;

public interface ITaskCompleteRepository  {
    // This interface can be extended with methods for task completion operations
    // For example:
     TaskComplete save(TaskComplete taskComplete);
    // Optional<TaskComplete> findById(Long id);
    // List<TaskComplete> findAll();
    // void deleteById(Long id);
}
