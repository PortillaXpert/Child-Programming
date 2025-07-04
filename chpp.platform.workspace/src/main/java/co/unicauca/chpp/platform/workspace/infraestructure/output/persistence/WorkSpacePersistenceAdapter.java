package co.unicauca.chpp.platform.workspace.infraestructure.output.persistence;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import co.unicauca.chpp.platform.workspace.application.output.WorkSpaceOutputPort;
import co.unicauca.chpp.platform.workspace.domain.model.WorkSpace;
import co.unicauca.chpp.platform.workspace.infraestructure.output.persistence.entity.WorkSpaceEntity;
import co.unicauca.chpp.platform.workspace.infraestructure.output.persistence.mapper.WorkSpacePersistenceMapper;
import co.unicauca.chpp.platform.workspace.infraestructure.output.persistence.repository.WorkSpaceRepository;

@Component
public class WorkSpacePersistenceAdapter implements WorkSpaceOutputPort{

    private final WorkSpaceRepository workSpaceRepository;

    private final WorkSpacePersistenceMapper workSpacePersistenceMapper;


    public WorkSpacePersistenceAdapter(WorkSpaceRepository workSpaceRepository, WorkSpacePersistenceMapper workSpacePersistenceMapper) {
        this.workSpaceRepository = workSpaceRepository;
        this.workSpacePersistenceMapper = workSpacePersistenceMapper;
    }

    @Override
    public WorkSpace saveWorkSpace(WorkSpace workSpace) {

        WorkSpaceEntity workSpaceEntity = workSpacePersistenceMapper.toWorkSpaceEntity(workSpace);
        workSpaceRepository.save(workSpaceEntity);
        return workSpacePersistenceMapper.tWorkSpace(workSpaceEntity);
    }

    @Override
    public Optional<WorkSpace> getWorkSpaceById(Long id) {

        Optional<WorkSpaceEntity> workSpaceEntity = workSpaceRepository.findById(id);
        if(workSpaceEntity.isEmpty()){
            return Optional.empty();
        }
        WorkSpace workSpace = workSpacePersistenceMapper.tWorkSpace(workSpaceEntity.get());
        return Optional.of(workSpace);
    }

    @Override
    public Optional<List<Long>> getAllItemsById(Long id) {

        Optional<WorkSpaceEntity> workSpaceEntity = workSpaceRepository.findById(id);
        if(workSpaceEntity.isEmpty()){
            return Optional.empty();
        }

        WorkSpace workSpace = workSpacePersistenceMapper.tWorkSpace(workSpaceEntity.get());
        List<Long> items = workSpace.getItems();
        return Optional.of(items);
    }

    @Override
    public Optional<WorkSpace> updateWorkSpace(WorkSpace workSpace, Long id) {

        Optional<WorkSpaceEntity> workSpaceEntity =  workSpaceRepository.findById(id);
        if(workSpaceEntity.isEmpty()){
            return Optional.empty();
        }

        WorkSpaceEntity newWorkSpaceEntity = workSpacePersistenceMapper.toWorkSpaceEntity(workSpace);
        newWorkSpaceEntity.setId(id);
        workSpaceRepository.save(newWorkSpaceEntity);
        WorkSpace updated = workSpacePersistenceMapper.tWorkSpace(newWorkSpaceEntity);
        return Optional.of(updated);
    }

    @Override
    public boolean deleteWorkSpace(Long id) {

       Optional<WorkSpaceEntity> workSpaceEntity = workSpaceRepository.findById(id);
        if(workSpaceEntity.isEmpty()){
            return false;
        }

        workSpaceRepository.deleteById(id);
        return true;
    }
    
}
