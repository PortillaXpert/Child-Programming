package co.unicauca.chpp.platform.users.infraestructure.output.persistence.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import co.unicauca.chpp.platform.users.infraestructure.output.persistence.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByUser(String username);
}
