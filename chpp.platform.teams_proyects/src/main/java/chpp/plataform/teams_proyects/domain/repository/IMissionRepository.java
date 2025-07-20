package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Mission;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface IMissionRepository {
    Mission save(Mission mission);
    Optional<Mission> findById(Long id);
    Page<Mission> findAll(Pageable pageable);
    Page<Mission> findByActiveTrue(Pageable pageable);
    Page<Mission> findByActiveFalse(Pageable pageable);
    boolean deactivateMission(Long id);
    boolean activateMission(Long id);
    Mission update(Long id, Mission mission);
}