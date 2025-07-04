package co.unicauca.chpp.platform.users.infraestructure.output.persistence;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import co.unicauca.chpp.platform.users.application.output.UserOutputPort;
import co.unicauca.chpp.platform.users.domain.model.User;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.entity.UserEntity;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.mapper.UserPercistenceMapper;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.repository.UserRepository;

@Component
public class UserPersistenceAdapter implements UserOutputPort{

    private final UserRepository userRepository;
    private final UserPercistenceMapper userPercistenceMapper;

    public UserPersistenceAdapter(UserRepository userRepository, UserPercistenceMapper userPercistenceMapper) {
        this.userRepository = userRepository;
        this.userPercistenceMapper = userPercistenceMapper;
    }

    @Override
    public User saveUser(User user) {
        UserEntity userEntity = userPercistenceMapper.toUserEntity(user);
        return userPercistenceMapper.toUser(userRepository.save(userEntity));
    }

    @Override
    public Optional<User> getUserById(Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        if(userEntity.isEmpty()){
            return Optional.empty();
        }
        return Optional.of(userPercistenceMapper.toUser(userEntity.get()));
    }

    @Override
    public Optional<User> getUserByUser(String user) {
        Optional<UserEntity> userEntity = userRepository.findByUser(user);
        if (userEntity.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(userPercistenceMapper.toUser(userEntity.get()));
    }

    @Override
    public Optional<List<User>> getUsers(List<Long> ids) {
        List<User> users = new ArrayList<>();
        for(int i = 0; i< ids.size(); i++){
            Optional<UserEntity> userEntity = userRepository.findById(ids.get(i));
            if(!userEntity.isEmpty()){
                User user = userPercistenceMapper.toUser(userEntity.get());
                users.add(user);
            }
        }
        return Optional.of(users);
    }

    @Override
    public Optional<User> updateUser(Long id, User user) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        if(userEntity.isEmpty()){
            return Optional.empty();
        }
        UserEntity newUserEntity = userPercistenceMapper.toUserEntity(user);
        newUserEntity.setId(id);
        UserEntity updated = userRepository.save(newUserEntity);
        return Optional.of(userPercistenceMapper.toUser(updated));
    }

    @Override
    public boolean disableUser(Long id) {
        Optional<UserEntity> userEntity = userRepository.findById(id);
        if(userEntity.isEmpty()){
            return false;
        }
        UserEntity newUserEntity = userEntity.get();
        newUserEntity.setId(id);
        newUserEntity.setEnabled(false);
        userRepository.save(newUserEntity);
        return true;
    }
}
