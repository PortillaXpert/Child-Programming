package co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request;

import java.util.List;

import javax.validation.constraints.NotEmpty;

public class WorkSpaceRequest {
    private List<Long> items;
    @NotEmpty(message = "Nombre no puede estar en blanco")
    private String name;
    @NotEmpty(message = "Descripcion no puede estar en blanco")
    private String description;


    public WorkSpaceRequest() {
    }

    public WorkSpaceRequest(List<Long> items, String name, String description) {
        this.items = items;
        this.name = name;
        this.description = description;
    }

    public List<Long> getItems() {
        return this.items;
    }

    public void setItems(List<Long> items) {
        this.items = items;
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
