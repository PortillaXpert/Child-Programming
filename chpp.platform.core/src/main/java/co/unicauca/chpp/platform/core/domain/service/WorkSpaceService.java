package co.unicauca.chpp.platform.core.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import co.unicauca.chpp.platform.core.application.input.IWorkSpaceService;
import co.unicauca.chpp.platform.core.domain.model.WorkSpace;
import co.unicauca.chpp.platform.core.domain.model.exception.WorkSpaceException;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.WorkSpacePersistenceAdapter;

@Service
public class WorkSpaceService implements IWorkSpaceService{

    private WorkSpacePersistenceAdapter outputPort;

    public WorkSpaceService(WorkSpacePersistenceAdapter outputPort) {
        this.outputPort = outputPort;
    }
    
    @Override
    public WorkSpace createWorkSpace(WorkSpace workSpace) {
        workSpace = outputPort.saveWorkSpace(workSpace);
        return workSpace;
    }

    @Override
    public WorkSpace getWorkSpaceById(Long id) {
        return outputPort.getWorkSpaceById(id).orElseThrow(()-> new WorkSpaceException("Work space not found id:"+id));
    }

    @Override
    public List<Long> getAllItemsById(Long id) {
        return outputPort.getAllItemsById(id).orElseThrow(()-> new WorkSpaceException("Items not found for Work space id:" +id));
    }

    @Override
    public WorkSpace uptdateWorkSpace(Long id, WorkSpace workSpace) {
        return outputPort.updateWorkSpace(workSpace, id).orElseThrow(()-> new WorkSpaceException("Work space not updated id:"+id));  
    }

    @Override
    public boolean deleteWorkSpace(Long id) {
        return outputPort.deleteWorkSpace(id);
    }
    
}
