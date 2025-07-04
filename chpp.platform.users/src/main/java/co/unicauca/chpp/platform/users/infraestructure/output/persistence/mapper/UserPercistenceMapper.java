package co.unicauca.chpp.platform.users.infraestructure.output.persistence.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import co.unicauca.chpp.platform.users.domain.model.User;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.entity.UserEntity;

@Mapper(componentModel = "spring")
public interface UserPercistenceMapper {

    UserPercistenceMapper INSTANCE = Mappers.getMapper(UserPercistenceMapper.class);

    UserEntity toUserEntity(User user);
    User toUser(UserEntity userEntity);
    
}
