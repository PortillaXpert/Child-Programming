package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaTeamRepository extends JpaRepository<TeamEntity, Long> {
    List<TeamEntity> findByCourse(String courseId);

}
