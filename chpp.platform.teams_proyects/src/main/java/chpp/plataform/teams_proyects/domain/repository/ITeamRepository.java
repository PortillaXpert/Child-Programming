package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Team;

import java.util.List;
import java.util.Optional;

public interface ITeamRepository {
    Team create(Team team);
    Team update(Long id,Team team);
    Optional<Team> findById(Long id);
    boolean existsById(Long id);
    List<Team> findAll();
    List<Team> findByCourseId(String courseId);
    void reassignStudent(Long studentId, Long newTeamId);
    void dissolve(Long teamId);
}