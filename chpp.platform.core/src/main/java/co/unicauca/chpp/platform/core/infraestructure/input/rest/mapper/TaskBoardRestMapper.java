package co.unicauca.chpp.platform.core.infraestructure.input.rest.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import co.unicauca.chpp.platform.core.domain.model.TaskBoard;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.request.TaskBoardRequest;
import co.unicauca.chpp.platform.core.infraestructure.input.rest.data.response.TaskBoardDTO;

/**
 *
 * @author artur
*/

@Mapper(componentModel = "spring")
public interface TaskBoardRestMapper {

    TaskBoardRestMapper INSTANCE = Mappers.getMapper(TaskBoardRestMapper.class);

    TaskBoard toTaskBoard(TaskBoardRequest taskBoardRequest);
    TaskBoardDTO toTaskBoardDTO(TaskBoard taskBoard);
    
}
