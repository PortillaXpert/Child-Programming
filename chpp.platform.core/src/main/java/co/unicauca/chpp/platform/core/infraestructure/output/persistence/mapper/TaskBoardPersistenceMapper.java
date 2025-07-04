package co.unicauca.chpp.platform.core.infraestructure.output.persistence.mapper;


import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskBoardEntity;

/**
 *
 * @author artur
 * 
 */

@Mapper(componentModel = "spring")
public interface TaskBoardPersistenceMapper {

    TaskBoardPersistenceMapper INSTANCE = Mappers.getMapper(TaskBoardPersistenceMapper.class);

    TaskBoardEntity toTaskBoardEntity(TaskBoard taskBoard);
    TaskBoard toTaskBoard(TaskBoardEntity taskBoardEntity);
}
