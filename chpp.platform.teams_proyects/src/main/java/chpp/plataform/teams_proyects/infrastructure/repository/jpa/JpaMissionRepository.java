package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.MissionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaMissionRepository extends JpaRepository<MissionEntity, Long> {

}
