package co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response;

import java.util.List;

import co.unicauca.chpp.platform.core.domain.model.Task;

/**
 *
 * @author artur
 * POR MODIFICAR: Actualizar los cambios
 */


public class TaskBoardDTO {

    private Long id;
    private List<Task> tasks;
    private String name;
    private String description;

    public TaskBoardDTO() {
    }

    public TaskBoardDTO(Long id, List<Task> tasks, String name, String description) {
        this.id = id;
        this.tasks = tasks;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
}
