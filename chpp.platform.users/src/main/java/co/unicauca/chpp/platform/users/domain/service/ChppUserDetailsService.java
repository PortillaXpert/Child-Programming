package co.unicauca.chpp.platform.users.domain.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import co.unicauca.chpp.platform.users.domain.model.ChppUserDetails;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.entity.UserEntity;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.mapper.UserPercistenceMapper;
import co.unicauca.chpp.platform.users.infraestructure.output.persistence.repository.UserRepository;

public class ChppUserDetailsService implements UserDetailsService{

    @Autowired
    UserRepository repo;
    @Autowired
    UserPercistenceMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserEntity> user =repo.findByUser(username);

        if (user == null) {
            throw new UsernameNotFoundException("No se entontró el usuario");
        }

        return new ChppUserDetails(mapper.toUser(user.get()));
    }
    
}
