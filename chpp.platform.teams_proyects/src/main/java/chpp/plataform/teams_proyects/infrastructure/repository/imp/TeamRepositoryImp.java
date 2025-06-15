package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.domain.repository.ITeamRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.MissionEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.TeamEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.JpaMissionRepository;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.JpaTeamRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Transactional
public class TeamRepositoryImp implements ITeamRepository {

    private final JpaTeamRepository jpaTeamRepository;
    private final JpaMissionRepository jpaMissionRepository;

    @Override
    public Team create(Team team) {
        TeamEntity entity = TeamEntityMapper.toEntity(team);
        return TeamEntityMapper.toDomain(jpaTeamRepository.save(entity));
    }

    @Override
    public Team update(Long id,Team team) {
        if (!jpaTeamRepository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        TeamEntity entity = TeamEntityMapper.toEntity(team);
        return TeamEntityMapper.toDomain(jpaTeamRepository.save(entity));
    }

    @Override
    public void delete(Long id) {
        if (!jpaTeamRepository.existsById(id)) {
            throw new EntityNotFoundException();
        }
        jpaTeamRepository.deleteById(id);
    }

    @Override
    public Optional<Team> findById(Long id) {
        return jpaTeamRepository.findById(id)
                .map(TeamEntityMapper::toDomain);
    }

    @Override
    public boolean existsById(Long id) {
        return jpaTeamRepository.existsById(id);
    }

    @Override
    public List<Team> findAll() {
        return jpaTeamRepository.findAll()
                .stream()
                .map(TeamEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public List<Team> findByCourseId(String courseId) {
        return jpaTeamRepository.findByCourse(courseId)
                .stream()
                .map(TeamEntityMapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void reassignStudent(Long studentId, Long newTeamId) {
        TeamEntity team = jpaTeamRepository.findById(newTeamId)
                .orElseThrow(EntityNotFoundException::new);

        // TODO Lógica de reasignación aquí

        jpaTeamRepository.save(team);
    }

    @Override
    public void dissolve(Long teamId) {
        TeamEntity team = jpaTeamRepository.findById(teamId)
                .orElseThrow(EntityNotFoundException::new);

        jpaTeamRepository.delete(team);
    }

    @Override
    @Transactional
    public void assignMission(Long teamId, Long missionId) {
        TeamEntity team = jpaTeamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found"));

        MissionEntity mission = jpaMissionRepository.findById(missionId)
                .orElseThrow(() -> new EntityNotFoundException("Mission not found"));

        team.setMission(mission);
        jpaTeamRepository.save(team);
    }

}