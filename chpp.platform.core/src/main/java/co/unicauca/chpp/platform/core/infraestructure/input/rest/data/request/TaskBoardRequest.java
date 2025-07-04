package co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;
import javax.validation.constraints.Size;

import co.unicauca.chpp.platform.core.domain.model.Task;

/**
 *
 * @author artur
 * 
 */

public class TaskBoardRequest {

    @Null(message = "El campo debe estar vacío")
    private Long id;
    @Size(min = 0, message = "El campo debe estar vacío")
    private List<Task> tasks;
    @NotEmpty(message="Nombre no puede estar en blanco")
    private String name;
    @NotEmpty(message="Descripción no puede quedar en blanco")
    private String description;
    

    public TaskBoardRequest() {
    }

    public TaskBoardRequest(Long id, List<Task> tasks, String name, String description) {
        this.id = id;
        this.tasks = tasks;
        this.name = name;
        this.description = description;
    }

    public List<Task> getTasks() {
        return this.tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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
