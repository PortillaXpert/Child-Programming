package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.domain.repository.ITeamRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.TeamEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.JpaTeamRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;


@Repository
@RequiredArgsConstructor
@Transactional
public class TeamRepositoryImp implements ITeamRepository {

    private final JpaTeamRepository jpaTeamRepository;

    @Override
    @Transactional
    public Team create(Team team) {
        TeamEntity teamEntity = TeamEntityMapper.toEntity(team);
        teamEntity.setActive(true);
        TeamEntity saved = jpaTeamRepository.save(teamEntity);
        return TeamEntityMapper.toDomain(saved);
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
    public Page<Team> findAll(Pageable pageable) {
        return jpaTeamRepository.findAll(pageable).map(TeamEntityMapper::toDomain);
    }

    @Override
    public Page<Team> getTeamsActive(Pageable pageable) {
        return jpaTeamRepository.findAllActiveTeams(pageable)
                .map(TeamEntityMapper::toDomain);
    }



    @Override
    public Page<Team> findByCourseId(Pageable pageable, List<String> courses) {
        return jpaTeamRepository
                .findActiveTeamsByCourse(pageable, courses).map(TeamEntityMapper::toDomain);
    }


    @Override
    public void dissolve(Long teamId) {
        TeamEntity team = jpaTeamRepository.findById(teamId)
                .orElseThrow(EntityNotFoundException::new);

        team.setActive(false);
        jpaTeamRepository.save(team);
    }

    @Override
    public void activateTeam(Long teamId) {
        TeamEntity team = jpaTeamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado con ID: " + teamId));
        team.setActive(true);
        jpaTeamRepository.save(team);
    }

    @Override
    public Team getTeamByStudentCode(String studentCode) {
    TeamEntity teamEntity = jpaTeamRepository.findActiveTeamByStudentCode(studentCode);
    if (teamEntity == null) {
        throw new EntityNotFoundException("Equipo no encontrado para el estudiante con código: " + studentCode);
    }
    return TeamEntityMapper.toDomain(teamEntity);
    }

    @Override
    @Transactional
    public Team update(Long teamId, Team teamUpdate) {
        TeamEntity existingTeam = jpaTeamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado"));

        existingTeam.setName(teamUpdate.getName());
        existingTeam.setCourse(teamUpdate.getCourse());
        existingTeam.setActive(true);
        return TeamEntityMapper.toDomain(jpaTeamRepository.save(existingTeam));
    }



}