package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.MissionTeamAssignedEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJpaMissionTeamAssignmentRepository extends JpaRepository<MissionTeamAssignedEntity, Long> {
}
