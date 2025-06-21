package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.MissionTeamAssignedEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IJpaMTAssignmentRepository extends JpaRepository<MissionTeamAssignedEntity, Long> {
    List<MissionTeamAssignedEntity> findByTeamId(Long teamId);
}
