package co.unicauca.chpp.platform.core.infraestructure.input.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.unicauca.chpp.platform.core.domain.model.Task;
import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.domain.service.TaskBoardService;
import co.unicauca.chpp.platform.core.domain.service.TaskService;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request.TaskRequest;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response.TaskDTO;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.mapper.TaskRestMapper;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chpp/Tasks")
public class TaskRestAdapter {
    
    private TaskService taskService;

    private TaskRestMapper taskRestMapper;  
    
    private TaskBoardService taskBoardService;

    public TaskRestAdapter(TaskService taskService, TaskRestMapper taskRestMapper, TaskBoardService taskBoardService) {
        this.taskService = taskService;
        this.taskRestMapper = taskRestMapper;
        this.taskBoardService = taskBoardService;
    }

    @PostMapping(value = "/{taskBoardId}/new")
    public ResponseEntity<TaskDTO> createTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable (value = "taskBoardId") long taskBoardId){
        TaskBoard taskBoard = taskBoardService.getTaskBoardById(taskBoardId);
        Task task = taskRestMapper.toTask(taskRequest);
        taskBoard.addTask(task);
        taskBoard = taskBoardService.updateTaskBoard(taskBoardId, taskBoard);
        task = taskBoard.getTasks().get(taskBoard.getTasks().size()-1);
        return new ResponseEntity<>(taskRestMapper.toTaskDTO(task), HttpStatus.CREATED);       
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable long id){
        Task task = taskService.getTaskById(id);
        if(task == null){
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(taskRestMapper.toTaskDTO(task), HttpStatus.OK);
    }

    @GetMapping(value = "/{taskBoardId}/tasks")
    public ResponseEntity<List<TaskDTO>> getAllTaskByTaskBoardId(@PathVariable (value = "taskBoardId") long taskBoardId){
        TaskBoard taskBoard = taskBoardService.getTaskBoardById(taskBoardId);
        List<Task> tasks = taskBoard.getTasks();
        return new ResponseEntity<>(taskRestMapper.toListTaskDTO(tasks), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TaskDTO> updateTask(@RequestBody @Valid TaskRequest taskRequest, @PathVariable Long id){
        Task task = taskService.getTaskById(id);
        if (task == null){
            return ResponseEntity.notFound().build();
        }
        Task newTask = taskRestMapper.toTask(taskRequest);
        newTask = taskService.updateTask(id, newTask);
        return new ResponseEntity<>(taskRestMapper.toTaskDTO(newTask), HttpStatus.OK);
    }

    @DeleteMapping(value = "{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id){
        if(taskService.deleteTask(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
