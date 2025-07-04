package co.unicauca.chpp.platform.users.domain.service;

import java.util.List;

import org.springframework.stereotype.Service;

import co.unicauca.chpp.platform.users.application.input.IUserService;
import co.unicauca.chpp.platform.users.domain.model.User;
import co.unicauca.chpp.platform.users.domain.model.exception.UserException;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.UserPersistenceAdapter;

@Service
public class UserService  implements IUserService{

    private UserPersistenceAdapter outputPort;

    public UserService(UserPersistenceAdapter outputPort) {
        this.outputPort = outputPort;
    }

    @Override
    public User createUser(User user) {
        user = outputPort.saveUser(user);
        return user;        
    }

    @Override
    public User getUserById(Long id) {
        return outputPort.getUserById(id).orElseThrow(()-> new UserException("User not found id:"+id));
    }

    @Override
    public List<User> getUsersByIds(List<Long> ids) {
       return outputPort.getUsers(ids).orElseThrow(()-> new UserException("Users not found id:"+ids.toString()));
    }

    @Override
    public User getUserByUser(String user) {
        return outputPort.getUserByUser(user).orElseThrow(()-> new UserException("Users not found user: "+user));
    }

    @Override
    public User updateUser(Long id, User user) {
        return outputPort.updateUser(id, user).orElseThrow(()-> new UserException("Users not updated id: "+id));
    }

    @Override
    public boolean disableUser(Long id) {
        return outputPort.disableUser(id);    
    }
}
