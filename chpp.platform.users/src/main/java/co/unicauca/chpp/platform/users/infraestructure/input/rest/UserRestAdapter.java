package co.unicauca.chpp.platform.users.infraestructure.input.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import co.unicauca.chpp.platform.users.domain.model.User;
import co.unicauca.chpp.platform.users.domain.service.UserService;
import co.unicauca.chpp.platform.users.infraestructure.input.rest.data.request.UserRequest;
import co.unicauca.chpp.platform.users.infraestructure.input.rest.data.response.UserDTO;
import co.unicauca.chpp.platform.users.infraestructure.input.rest.mapper.UserRestMapper;

import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/chpp/Users")
public class UserRestAdapter {

    private UserService userService;
    private UserRestMapper userRestMapper;

    public UserRestAdapter(UserService userService, UserRestMapper userRestMapper) {
        this.userService = userService;
        this.userRestMapper = userRestMapper;
    }

    @PostMapping(value = "/new")
    public ResponseEntity<UserDTO> createUser(@RequestBody @Valid UserRequest userRequest){
        User user = userRestMapper.toUser(userRequest);
        User newUser = userService.createUser(user);

        return new ResponseEntity<>(userRestMapper.toUserDTO(newUser), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<UserDTO> getUserById (@PathVariable Long id){
        User user = userService.getUserById(id);
        if(user == null){
            return ResponseEntity.notFound().build();
        }
        return new ResponseEntity<>(userRestMapper.toUserDTO(user), HttpStatus.OK);
    }

    @GetMapping("/{ids}")
    public ResponseEntity<List<UserDTO>> getUsersByIds(@PathVariable List<Long> ids) {
        List<User> users = userService.getUsersByIds(ids);
        if (users.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<UserDTO> userDTOs = users.stream().map(userRestMapper::toUserDTO).collect(Collectors.toList());

    return new ResponseEntity<>(userDTOs, HttpStatus.OK);
    }

    @GetMapping("/{user}")
    public ResponseEntity<UserDTO> getUserByUser(@PathVariable String user) {
        User foundUser = userService.getUserByUser(user);
        if (foundUser == null) {
            return ResponseEntity.notFound().build();
        }
        UserDTO userDTO = userRestMapper.toUserDTO(foundUser);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> updateUser(@RequestBody @Valid UserRequest userRequest, @PathVariable Long id){
        User user = userService.getUserById(id);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        User newUser = userRestMapper.toUser(userRequest);
        newUser = userService.updateUser(id, newUser);
        return new ResponseEntity<>(userRestMapper.toUserDTO(newUser),HttpStatus.OK);
    }

    @PutMapping(value = "/disable/{id}")
    public ResponseEntity<UserDTO> disableUser(@PathVariable Long id){
        if (!userService.disableUser(id)) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.noContent().build();    
    }
}   
