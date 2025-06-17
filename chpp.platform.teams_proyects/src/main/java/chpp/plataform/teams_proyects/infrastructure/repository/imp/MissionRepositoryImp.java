package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
@Transactional
public class MissionRepositoryImp implements IMissionRepository {

    @Override
    public Mission save(Mission mission) {
        return null;
    }

    @Override
    public Optional<Mission> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public List<Mission> findAll() {
        return List.of();
    }

    @Override
    public List<Mission> findByActiveTrue() {
        return List.of();
    }

    @Override
    public List<Mission> findByActiveFalse() {
        return List.of();
    }

    @Override
    public boolean deactivateMission(Long id) {
        return false;
    }
}
