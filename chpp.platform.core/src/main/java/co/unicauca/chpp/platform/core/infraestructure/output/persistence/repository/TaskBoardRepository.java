package co.unicauca.chpp.platform.core.infraestructure.output.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.TaskBoardEntity;

/**
 *
 * @author artur
 */

public interface TaskBoardRepository extends JpaRepository<TaskBoardEntity, Long>{
    
}
