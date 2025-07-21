package chpp.plataform.teams_proyects.infrastructure.repository.imp;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.repository.IMTAssigmentRepository;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionTAEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.TaskEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.IJpaMTAssignmentRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.MissionTeamAssignedEntity;
import java.util.List;

import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
@Transactional
public class MTAssignmentImp implements IMTAssigmentRepository {

    private final IJpaMTAssignmentRepository jpaRepository;
    private final MissionTAEntityMapper mapper;

    @Override
    public MissionTeamAssigment create(MissionTeamAssigment missionTeamAssigment) {
        MissionTeamAssignedEntity entity = MissionTAEntityMapper.toEntity(missionTeamAssigment);
        return mapper.toDomain(jpaRepository.save(entity));
    }

    @Override
    public Page<MissionTeamAssigment> getAllMissionTeamAssigned(Pageable pageable) {
        return jpaRepository.findAll(pageable).map(mapper::toDomain);
    }

    @Override
    public List<MissionTeamAssigment> findInProgressByTeamId(Long teamId) {
        return jpaRepository.findInProgressByTeamId(teamId)
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public MissionTeamAssigment updateTasks(Long assignmentId, List<TaskComplete> tasks) {
        MissionTeamAssignedEntity entity = jpaRepository.findById(assignmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id: " + assignmentId));
        entity.setStatus(AssignmentStatus.COMPLETED);
        return mapper.toDomain(jpaRepository.save(entity));
    }

    @Override
    public MissionTeamAssigment updateStatus(Long assignmentId, AssignmentStatus status) {
        MissionTeamAssignedEntity entity = jpaRepository.findById(assignmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id: " + assignmentId));
        entity.setStatus(status);
        return mapper.toDomain(jpaRepository.save(entity));
    }

    @Override
    public MissionTeamAssigment update(Long id, MissionTeamAssigment missionTeamAssigment) {
        MissionTeamAssignedEntity entity = jpaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id: " + id));

        entity.setMission(MissionEntityMapper.toEntity(missionTeamAssigment.getMission()));
        entity.setTeam(TeamEntityMapper.toEntity(missionTeamAssigment.getTeam()));
        entity.setStatus(missionTeamAssigment.getStatus());
        entity.setCompletedTasks(missionTeamAssigment.getTasksCompleted()
                .stream().map(TaskEntityMapper::toEntity).collect(Collectors.toList()));

        return mapper.toDomain(jpaRepository.save(entity));
    }

    @Override
    public MissionTeamAssigment getById(Long id) {
        MissionTeamAssignedEntity entity = jpaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id: " + id));
        return mapper.toDomain(entity);
    }

    @Override
    public List<MissionTeamAssigment> getByTeamId(Long teamId) {
        return jpaRepository.findByTeamId(teamId)
                .stream()
                .map(mapper::toDomain)
                .collect(Collectors.toList());
    }

    @Override
    public void delete(Long id) {
        MissionTeamAssignedEntity entity = jpaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assignment not found with id: " + id));
        entity.setStatus(AssignmentStatus.DESACTIVATE);
        jpaRepository.save(entity);
    }


}
