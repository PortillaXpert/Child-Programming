package co.unicauca.chpp.platform.users.infraestructure.input.rest.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.users.domain.model.User;
import co.unicauca.chpp.platform.users.infraestructure.input.rest.data.request.UserRequest;
import co.unicauca.chpp.platform.users.infraestructure.input.rest.data.response.UserDTO;

@Mapper(componentModel = "spring")
public interface UserRestMapper {
    
    UserRestMapper INSTANCE = Mappers.getMapper(UserRestMapper.class);

    User toUser(UserRequest userRequest);
    UserDTO toUserDTO(User user);
}
