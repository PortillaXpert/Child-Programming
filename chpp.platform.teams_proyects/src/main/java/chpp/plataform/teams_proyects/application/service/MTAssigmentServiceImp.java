package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.repository.IMTAssigmentRepository;
import chpp.plataform.teams_proyects.domain.service.IMTAssigmentService;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.TaskCompleteDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionTAMapper;
import chpp.plataform.teams_proyects.shared.exceptions.ExceptionsUtils;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import chpp.plataform.teams_proyects.shared.validation.ValidationUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.List;


@Service
@RequiredArgsConstructor
public class MTAssigmentServiceImp implements IMTAssigmentService {

    private final IMTAssigmentRepository assignmentRepository;

    @Override
    @Transactional
    public ResponseDto<MissionTeamAssignedDTO> createAssignment(MissionTeamAssignedDTO dto) {
        validateAssignmentDTO(dto);

        MissionTeamAssigment assignment = MissionTAMapper.toDomain(dto);
        ResponseDto<MissionTeamAssignedDTO> conflict = getAssignsByTeam(dto.getTeamId());

        if (conflict != null) return conflict;

        if (assignment.getTasksCompleted() != null) {
            assignment.getTasksCompleted().forEach(task -> task.setAssignment(assignment));
        }

        MissionTeamAssigment createdAssignment = assignmentRepository.create(assignment);
        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessagesUtils.get(MessagesConstant.IM002),
                MissionTAMapper.toDTO(createdAssignment)
        );
    }

    @Override
    public ResponseDto<PagedResponseDTO<MissionTeamAssignedDTO>> getAllMissionTeamAssigned(int page, int size) {
        Page<MissionTeamAssigment> pagedResponse = assignmentRepository.getAllMissionTeamAssigned(
                PageRequest.of(page, size)
        );

        List<MissionTeamAssignedDTO> content = pagedResponse.getContent().stream()
                .map(MissionTAMapper::toDTO)
                .toList();

        PagedResponseDTO<MissionTeamAssignedDTO> response = new PagedResponseDTO<>(
                pagedResponse.getNumber(),
                pagedResponse.getTotalPages(),
                pagedResponse.getTotalElements(),
                content,
                pagedResponse.isLast()
        );

        if (response.getData().isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessagesUtils.get(MessagesConstant.EM012),
                    null
            );
        }

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                response
        );
    }

    @Override
    public ResponseDto<List<MissionTeamAssignedDTO>> findInProgressByTeamId(Long teamId) {
        ValidationUtils.validateRequired(teamId, "teamId");
        List<MissionTeamAssigment> assignments = assignmentRepository.findInProgressByTeamId(teamId);
        return getListResponseDto(assignments);
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> updateTasks(Long assignmentId, List<TaskCompleteDTO> tasks) {
        ValidationUtils.validateRequired(tasks, "tasks");

        MissionTeamAssigment updatedAssignment = assignmentRepository.updateTasks(
                validateAndGetAssignmentId(assignmentId), tasks);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                MissionTAMapper.toDTO(updatedAssignment)
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> updateStatus(Long assignmentId, AssignmentStatus status) {
        ValidationUtils.validateRequired(status, "status");

        MissionTeamAssigment updatedAssignment = assignmentRepository.updateStatus(
                validateAndGetAssignmentId(assignmentId), status);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                MissionTAMapper.toDTO(updatedAssignment)
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> getAssignmentById(Long assignmentId) {
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                MissionTAMapper.toDTO(getAssignmentOrThrow(assignmentId))
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> update(Long id, MissionTeamAssignedDTO dto) {
        getAssignmentOrThrow(id);
        validateAssignmentDTO(dto);

        ResponseDto<MissionTeamAssignedDTO> conflict = getAssignsByTeam(dto.getTeamId());
        if (conflict != null) return conflict;

        MissionTeamAssigment updated = assignmentRepository.update(id, MissionTAMapper.toDomain(dto));
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                MissionTAMapper.toDTO(updated)
        );
    }

    @Override
    public void delete(Long id) {
        validateAndGetAssignmentId(id);
        assignmentRepository.delete(id);
    }

    @Override
    public ResponseDto<List<MissionTeamAssignedDTO>> getByTeamId(Long teamId) {
        ValidationUtils.validateRequired(teamId, "teamId");
        List<MissionTeamAssigment> assignments = assignmentRepository.getByTeamId(teamId);
        return getListResponseDto(assignments);
    }

    private void validateAssignmentDTO(MissionTeamAssignedDTO dto) {
        ValidationUtils.validateRequired(dto, "assignment");
        ValidationUtils.validateRequired(dto.getTeamId(), "teamId");
        ValidationUtils.validateRequired(dto.getMissionId(), "missionId");
    }

    private Long validateAndGetAssignmentId(Long assignmentId) {
        ValidationUtils.validateRequired(assignmentId, "assignmentId");
        return assignmentId;
    }

    private MissionTeamAssigment getAssignmentOrThrow(Long assignmentId) {
        validateAndGetAssignmentId(assignmentId);
        MissionTeamAssigment assignment = assignmentRepository.getById(assignmentId);
        if (assignment == null) {
            throw ExceptionsUtils.notFound(MessagesConstant.EM007, "Assignment", assignmentId);
        }
        return assignment;
    }

    private ResponseDto<MissionTeamAssignedDTO> getAssignsByTeam(Long teamId) {
        List<MissionTeamAssigment> existingAssignments = assignmentRepository.getByTeamId(teamId);
        boolean hasActive = existingAssignments.stream()
                .anyMatch(a -> a.getStatus() != AssignmentStatus.COMPLETED &&
                        a.getStatus() != AssignmentStatus.REVIEWED);

        if (hasActive) {
            return new ResponseDto<>(
                    HttpStatus.BAD_REQUEST.value(),
                    "Mission Team Assignment already in progress",
                    null
            );
        }
        return null;
    }

    private ResponseDto<List<MissionTeamAssignedDTO>> getListResponseDto(List<MissionTeamAssigment> assignments) {
        if (assignments.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessagesUtils.get(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }

        List<MissionTeamAssignedDTO> dtos = assignments.stream()
                .map(MissionTAMapper::toDTO)
                .toList();

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                dtos
        );
    }
}
