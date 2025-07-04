package co.unicauca.chpp.platform.users.application.output;

import java.util.List;
import java.util.Optional;

import co.unicauca.chpp.platform.users.domain.model.User;

public interface UserOutputPort {
    User saveUser(User user);
    Optional<User> getUserById(Long id);
    Optional<User> getUserByUser(String user);
    Optional<List<User>> getUsers(List<Long> ids);
    Optional<User> updateUser(Long id, User user);
    boolean disableUser(Long id);
}
