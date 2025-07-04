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

import co.unicauca.chpp.platform.core.domain.model.WorkSpace;
import co.unicauca.chpp.platform.core.domain.service.WorkSpaceService;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request.WorkSpaceRequest;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response.WorkSpaceDTO;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.mapper.WorkSpaceRestMapper;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chpp/WorkSpaces")

public class WorkSpaceRestAdapter {
    
    private WorkSpaceService workSpaceService;

    private WorkSpaceRestMapper workSpaceRestMapper;


    public WorkSpaceRestAdapter(WorkSpaceService workSpaceService, WorkSpaceRestMapper workSpaceRestMapper) {
        this.workSpaceService = workSpaceService;
        this.workSpaceRestMapper = workSpaceRestMapper;
    }

    @PostMapping(value = "/new")
    public ResponseEntity<WorkSpaceDTO> createWorkSpace(@RequestBody @Valid WorkSpaceRequest workSpaceRequest){
        WorkSpace workSpace = workSpaceRestMapper.toWorkSpace(workSpaceRequest);
        workSpace = workSpaceService.createWorkSpace(workSpace);

        return new ResponseEntity<>(workSpaceRestMapper.toWorkSpaceDTO(workSpace), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<WorkSpaceDTO> getWorkSpaceById(@PathVariable Long id){
        WorkSpace workSpace = workSpaceService.getWorkSpaceById(id);
        if(workSpace == null){
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(workSpaceRestMapper.toWorkSpaceDTO(workSpace),HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<WorkSpaceDTO> updateWorkSpace(@RequestBody @Valid WorkSpaceRequest workSpaceRequest, @PathVariable Long id){
        WorkSpace workSpace = workSpaceService.getWorkSpaceById(id);
        if(workSpace == null){
            return ResponseEntity.notFound().build();
        }
        WorkSpace newWorkSpace = workSpaceRestMapper.toWorkSpace(workSpaceRequest);
        workSpace = workSpaceService.uptdateWorkSpace(id, newWorkSpace);
        return new ResponseEntity<>(workSpaceRestMapper.toWorkSpaceDTO(workSpace), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteWorkSpace(@PathVariable Long id){
        if(workSpaceService.deleteWorkSpace(id)){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
