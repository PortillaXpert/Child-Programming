package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

public interface IJpaStudentRepository extends JpaRepository<StudentEntity, Long> {

    @Query("SELECT s FROM StudentEntity s WHERE s.studentCod IN :studentCods")
    List<StudentEntity> findByStudentCodIn(List<Long> studentCods);

    @Modifying
    @Query("UPDATE StudentEntity s SET s.team = null WHERE s.studentCod IN :studentIds AND s.team.id = :teamId")
    @Transactional
    void removeTeamAssignment(@Param("teamId") Long teamId, @Param("studentIds") Set<Long> studentIds);

    @Modifying
    @Query("UPDATE StudentEntity s SET s.team.id = :teamId WHERE s.studentCod IN :studentIds")
    @Transactional
    void assignToTeam(@Param("teamId") Long teamId, @Param("studentIds") Set<Long> studentIds);

    @Query("SELECT s FROM StudentEntity s WHERE s.course = :course")
    List<StudentEntity> findByCourse(@Param("courseName") String course);
}
