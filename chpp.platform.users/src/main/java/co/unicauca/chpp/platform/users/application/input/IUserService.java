package co.unicauca.chpp.platform.users.application.input;

import java.util.List;

import co.unicauca.chpp.platform.users.domain.model.User;

public interface IUserService {
    
    User createUser(User user);
    User getUserById(Long id);
    List<User> getUsersByIds(List <Long> ids);
    User getUserByUser(String user);
    User updateUser(Long id, User user);
    boolean disableUser(Long id);

}
