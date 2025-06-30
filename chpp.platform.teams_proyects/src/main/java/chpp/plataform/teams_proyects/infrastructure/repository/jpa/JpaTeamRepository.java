package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface JpaTeamRepository extends JpaRepository<TeamEntity, Long> {
    List<TeamEntity> findByCourse(String courseId);

    @Query("SELECT t FROM TeamEntity t JOIN t.students s WHERE s.studentCod = :studentCode")
    TeamEntity findTeamByStudentCode(@Param("studentCode") String studentCode);
}
