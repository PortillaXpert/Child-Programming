package co.unicauca.chpp.platform.core.application.output;

import java.util.List;
import java.util.Optional;

import co.unicauca.chpp.platform.core.domain.model.WorkSpace;

public interface WorkSpaceOutputPort {

    WorkSpace saveWorkSpace(WorkSpace workSpace);
    
    Optional<WorkSpace> getWorkSpaceById (Long id);
    Optional<List<Long>> getAllItemsById(Long id);
    Optional<WorkSpace> updateWorkSpace(WorkSpace workSpace, Long id);

    boolean deleteWorkSpace(Long id);
}
