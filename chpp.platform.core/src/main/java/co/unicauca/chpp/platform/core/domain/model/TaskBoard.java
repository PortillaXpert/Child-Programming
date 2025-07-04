package co.unicauca.chpp.platform.core.domain.model;

import java.util.List;
/**
 *
 * @author artur
 * 
 */
public class TaskBoard {

    private Long id;
    private List<Task> tasks;
    private String name;
    private String description;

    public TaskBoard() {
    }

    public TaskBoard(Long id, List<Task> tasks, String name, String description) {
        this.id = id;
        this.tasks = tasks;
        this.name = name;
        this.description = description;
    }

    public void addTask (Task task){
        tasks.add(task);
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
