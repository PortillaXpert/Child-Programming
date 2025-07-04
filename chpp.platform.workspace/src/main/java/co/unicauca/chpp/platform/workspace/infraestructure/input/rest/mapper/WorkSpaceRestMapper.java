package co.unicauca.chpp.platform.workspace.infraestructure.input.rest.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.workspace.domain.model.WorkSpace;
import co.unicauca.chpp.platform.workspace.infraestructure.input.rest.data.request.WorkSpaceRequest;
import co.unicauca.chpp.platform.workspace.infraestructure.input.rest.data.response.WorkSpaceDTO;

@Mapper(componentModel = "spring")
public interface WorkSpaceRestMapper {
    
    WorkSpaceRestMapper INSTANCE = Mappers.getMapper(WorkSpaceRestMapper.class);

    @Mapping(target = "id", ignore = true)
    WorkSpace toWorkSpace(WorkSpaceRequest workSpaceRequest);
    WorkSpaceDTO toWorkSpaceDTO(WorkSpace workSpace);
}
