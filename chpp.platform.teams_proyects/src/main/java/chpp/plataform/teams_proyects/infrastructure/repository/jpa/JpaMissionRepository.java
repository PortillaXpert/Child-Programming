package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface JpaMissionRepository extends JpaRepository<MissionEntity, Long> {

    Page<MissionEntity> findByActiveTrue(Pageable pageable);
    Page<MissionEntity> findByActiveFalse(Pageable pageable);

    @Modifying
    @Query("UPDATE MissionEntity m SET m.active = :active WHERE m.id = :id")
    int updateActiveStatus(@Param("id") Long id, @Param("active") boolean active);
}
