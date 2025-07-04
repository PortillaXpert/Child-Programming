package co.unicauca.chpp.platform.core.infraestructure.input.rest;

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

import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.domain.service.TaskBoardService;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request.TaskBoardRequest;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response.TaskBoardDTO;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.mapper.TaskBoardRestMapper;

/**
 *
 * @author artur
 * Aqui se atienenden las solicitudes rest
 */

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chpp/TaskBoards")
public class TaskBoardRestAdapter {

    private TaskBoardService taskBoardService;
    
    private TaskBoardRestMapper taskBoardRestMapper;
    

    public TaskBoardRestAdapter(TaskBoardService taskBoardService, TaskBoardRestMapper TaskBoardRestMapper) {
        this.taskBoardService = taskBoardService;
        this.taskBoardRestMapper = TaskBoardRestMapper;
    }
    
    @PostMapping(value = "/new")
    public ResponseEntity<TaskBoardDTO> createTaskBoard(@RequestBody @Valid TaskBoardRequest taskBoardRequest) {

        TaskBoard taskBoard = taskBoardRestMapper.toTaskBoard(taskBoardRequest);
        TaskBoard taskBoardNew = taskBoardService.createTaskBoard(taskBoard);

        return new ResponseEntity<>(taskBoardRestMapper.toTaskBoardDTO(taskBoardNew), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TaskBoardDTO> getTaskBoardById(@PathVariable Long id) {

        TaskBoard taskBoard = taskBoardService.getTaskBoardById(id);

        if (taskBoard == null) {
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(taskBoardRestMapper.toTaskBoardDTO(taskBoard), HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TaskBoardDTO> updateTaskBoard(@RequestBody @Valid TaskBoardRequest taskBoardRequest, @PathVariable Long id) {

        TaskBoard taskBoard = taskBoardService.getTaskBoardById(id);

        if (taskBoard == null) {
            return ResponseEntity.notFound().build();
        }
        TaskBoard newTaskBoard = taskBoardRestMapper.toTaskBoard(taskBoardRequest);
        TaskBoard TaskBoardNew = taskBoardService.updateTaskBoard(id, newTaskBoard);
        return new ResponseEntity<>(taskBoardRestMapper.toTaskBoardDTO(TaskBoardNew), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteTaskBoard(@PathVariable Long id) {

        if (taskBoardService.deleteTaskBoard(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
