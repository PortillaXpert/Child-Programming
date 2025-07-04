package co.unicauca.chpp.platform.core.domain.model;

import java.util.List;

public class WorkSpace {

    private Long id;
    private List<Long> items;
    private String name;
    private String description;

    public WorkSpace() {
    }

    public WorkSpace(Long id, List<Long> items, String name, String description) {
        this.id = id;
        this.items = items;
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
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
