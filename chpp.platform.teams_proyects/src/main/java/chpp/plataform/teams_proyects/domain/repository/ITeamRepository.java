package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ITeamRepository {
    Team create(Team team);
    Team update(Long id,Team team);
    Optional<Team> findById(Long id);
    boolean existsById(Long id);
    Page<Team> findAll(Pageable pageable);
    Page<Team> findByCourseId(Pageable pageable,List<String> courses);
    void dissolve(Long teamId);
    Team getTeamByStudentCode(String studentCode);
    Page<Team> getTeamsActive(Pageable pageable);
    void activateTeam(Long teamId);
}