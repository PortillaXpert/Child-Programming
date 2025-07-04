package co.unicauca.chpp.platform.core.infraestructure.output.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskEntity;

public interface TaskRepository extends JpaRepository<TaskEntity, Long> {
    
}
