package co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Null;

public class TaskRequest {
    
    @Null(message = "El campo debe estar vacío")
    private Long id;
    @NotEmpty(message = "Nombre no puede estar en blanco")
    private String name;
    @NotEmpty(message = "Agregue una descripción")
    private String description;
    private int status;

    public TaskRequest() {
    }

    public TaskRequest(Long id, String name, String description, int status) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
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

    public int getStatus() {
        return this.status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
