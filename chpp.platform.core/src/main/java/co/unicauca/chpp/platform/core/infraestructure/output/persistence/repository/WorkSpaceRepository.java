package co.unicauca.chpp.platform.core.infraestructure.output.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import co.unicauca.chpp.platform.core.infraestructure.output.persistence.entity.WorkSpaceEntity;

public interface WorkSpaceRepository extends JpaRepository <WorkSpaceEntity, Long>{
    
}
