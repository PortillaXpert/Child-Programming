package co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.core.domain.model.WorkSpace;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.WorkSpaceEntity;

@Mapper(componentModel = "spring")
public interface WorkSpacePersistenceMapper {
    WorkSpacePersistenceMapper INSTANCE = Mappers.getMapper(WorkSpacePersistenceMapper.class);

    WorkSpaceEntity toWorkSpaceEntity(WorkSpace workSpace);
    WorkSpace tWorkSpace(WorkSpaceEntity workSpaceEntity);
}
