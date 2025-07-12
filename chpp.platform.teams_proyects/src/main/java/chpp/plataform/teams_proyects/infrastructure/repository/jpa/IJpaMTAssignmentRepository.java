package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionTeamAssignedEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IJpaMTAssignmentRepository extends JpaRepository<MissionTeamAssignedEntity, Long> {
    @Query("SELECT a FROM MissionTeamAssignedEntity a WHERE a.team.id " +
            "= :teamId AND a.status = chpp.plataform.teams_proyects.domain.model.AssignmentStatus.IN_PROGRESS")
    List<MissionTeamAssignedEntity> findInProgressByTeamId(@Param("teamId") Long teamId);

    @Query("SELECT a FROM MissionTeamAssignedEntity a WHERE a.team.id = :teamId")
    List<MissionTeamAssignedEntity> findByTeamId(Long teamId);
}
