package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Mission;

import java.util.List;
import java.util.Optional;

public interface IMissionRepository {
    Mission create(Mission mission);
    Optional<Mission> findById(Long id);
    List<Mission> findMissions();
    void update(Mission mission);
    void deactivate(Long id);
}