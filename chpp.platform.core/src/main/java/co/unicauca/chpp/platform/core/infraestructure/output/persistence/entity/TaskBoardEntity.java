package co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

/**
 *
 * @author artur
 */

@Entity
@Table(name = "task_board")
public class TaskBoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name ="idTaskBoard")
    private List<TaskEntity> tasks;
    private String name;
    private String description;


    public TaskBoardEntity() {
    }

    public TaskBoardEntity(Long id, List<TaskEntity> tasks, String name, String description) {
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

    public List<TaskEntity> getTasks() {
        return this.tasks;
    }

    public void setTasks(List<TaskEntity> tasks) {
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
