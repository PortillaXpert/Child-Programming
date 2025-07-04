package co.unicauca.chpp.platform.core.application.input;

import java.util.List;

import co.unicauca.chpp.platform.core.domain.model.WorkSpace;

public interface IWorkSpaceService {
    
    WorkSpace createWorkSpace(WorkSpace workSpace);
    WorkSpace getWorkSpaceById(Long id);
    List<Long> getAllItemsById(Long id);
    WorkSpace uptdateWorkSpace(Long id, WorkSpace workSpace);
    boolean deleteWorkSpace(Long id);

}
