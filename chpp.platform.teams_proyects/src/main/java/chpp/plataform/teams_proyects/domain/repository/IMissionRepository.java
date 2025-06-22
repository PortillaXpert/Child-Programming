package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Mission;

import java.util.List;
import java.util.Optional;

public interface IMissionRepository {
    Mission save(Mission mission);
    Optional<Mission> findById(Long id);
    List<Mission> findAll();
    List<Mission> findByActiveTrue();
    List<Mission> findByActiveFalse();
    boolean deactivateMission(Long id);
    boolean activateMission(Long id);
    Mission update(Long id,Mission mission);
}