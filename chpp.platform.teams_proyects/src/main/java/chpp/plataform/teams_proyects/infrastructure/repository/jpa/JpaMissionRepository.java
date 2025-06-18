package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.MissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JpaMissionRepository extends JpaRepository<MissionEntity, Long> {

    List<MissionEntity> findByActiveTrue();

    List<MissionEntity> findByActiveFalse();

    @Modifying
    @Query("UPDATE MissionEntity m SET m.active = :active WHERE m.id = :id")
    int updateActiveStatus(@Param("id") Long id, @Param("active") boolean active);
}
