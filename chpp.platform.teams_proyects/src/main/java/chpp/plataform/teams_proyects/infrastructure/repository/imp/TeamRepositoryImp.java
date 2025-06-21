package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.domain.repository.ITeamRepository;
import chpp.plataform.teams_proyects.infrastructure.entity.StudentEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.TeamEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.IJpaStudentRepository;
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
    private final IJpaStudentRepository jpaStudentRepository;

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

        StudentEntity student = jpaStudentRepository.findById(studentId)
                .orElseThrow(() -> new EntityNotFoundException("Estudiante no encontrado con ID: " + studentId));

        TeamEntity newTeam = jpaTeamRepository.findById(newTeamId)
                .orElseThrow(() -> new EntityNotFoundException("Equipo no encontrado con ID: " + newTeamId));


        if (student.getTeam() != null && student.getTeam().getId().equals(newTeamId)) {
            return;
        }

        student.setTeam(newTeam);
        jpaStudentRepository.save(student);
    }

    @Override
    public void dissolve(Long teamId) {
        TeamEntity team = jpaTeamRepository.findById(teamId)
                .orElseThrow(EntityNotFoundException::new);

        jpaTeamRepository.delete(team);
    }


}