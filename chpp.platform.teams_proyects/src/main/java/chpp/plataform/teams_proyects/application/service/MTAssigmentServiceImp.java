package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.repository.IMTAssigmentRepository;
import chpp.plataform.teams_proyects.domain.service.IMTAssigmentService;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionTAMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MTAssigmentServiceImp implements IMTAssigmentService {

    private final IMTAssigmentRepository assignmentRepository;

    @Override
    @Transactional
    public ResponseDto<MissionTeamAssignedDTO> createAssignment(MissionTeamAssignedDTO dto) {
        validateAssignmentDTO(dto);

        MissionTeamAssigment assignment = MissionTAMapper.toDomain(dto);

        if (assignment.getTasksCompleted() != null) {
            assignment.getTasksCompleted().forEach(task -> task.setAssignment(assignment));
        }

        MissionTeamAssigment createdAssignment = assignmentRepository.create(assignment);
        MissionTeamAssignedDTO createdDto = MissionTAMapper.toDTO(createdAssignment);

        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM002),
                createdDto
        );
    }

    @Override
    public ResponseDto<List<MissionTeamAssignedDTO>> getAllMissionTeamAssigned() {
        List<MissionTeamAssigment> assignments = assignmentRepository.getAllMissionTeamAssigned();
        return getListResponseDto(assignments);
    }

    @Override
    public ResponseDto<List<MissionTeamAssignedDTO>> getAssignmentsByTeam(Long teamId) {
        if (teamId == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "teamId")
            );
        }
        List<MissionTeamAssigment> assignments = assignmentRepository.getAssignmentsByTeam(teamId);
        return getListResponseDto(assignments);
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> updateTasks(Long assignmentId, List<TaskComplete> tasks) {
        if (tasks == null || tasks.isEmpty()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "tasks")
            );
        }
        MissionTeamAssigment updatedAssignment = assignmentRepository.updateTasks(
                validateAndGetAssignmentId(assignmentId), tasks);
        MissionTeamAssignedDTO updatedDto = MissionTAMapper.toDTO(updatedAssignment);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedDto
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> updateStatus(Long assignmentId, AssignmentStatus status) {
        if (status == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "status")
            );
        }
        MissionTeamAssigment updatedAssignment = assignmentRepository.updateStatus(
                validateAndGetAssignmentId(assignmentId), status);
        MissionTeamAssignedDTO updatedDto = MissionTAMapper.toDTO(updatedAssignment);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedDto
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> getAssignmentById(Long assignmentId) {
        MissionTeamAssigment assignment = getAssignmentOrThrow(assignmentId);
        MissionTeamAssignedDTO assignmentDto = MissionTAMapper.toDTO(assignment);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                assignmentDto
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> update(Long id, MissionTeamAssignedDTO missionTeamAssignedDTO) {
        MissionTeamAssigment assignment = getAssignmentOrThrow(id);
        validateAssignmentDTO(missionTeamAssignedDTO);
        MissionTeamAssigment updatedAssignment =
                assignmentRepository.update(id, MissionTAMapper.toDomain(missionTeamAssignedDTO));
        MissionTeamAssignedDTO updatedDto = MissionTAMapper.toDTO(updatedAssignment);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedDto
        );
    }

    @Override
    public void delete(Long id) {
        validateAndGetAssignmentId(id);
        assignmentRepository.delete(id);
    }

    private void validateAssignmentDTO(MissionTeamAssignedDTO dto) {
        if (dto == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "assignment")
            );
        }
        if (dto.getTeamId() == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "teamId")
            );
        }
        if (dto.getMissionId() == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "missionId")
            );
        }
    }

    private Long validateAndGetAssignmentId(Long assignmentId) {
        if (assignmentId == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "assignmentId")
            );
        }
        return assignmentId;
    }

    private MissionTeamAssigment getAssignmentOrThrow(Long assignmentId) {
        validateAndGetAssignmentId(assignmentId);
        MissionTeamAssigment assignment = assignmentRepository.getById(assignmentId);
        if (assignment == null) {
            throw new BusinessRuleException(
                    HttpStatus.NOT_FOUND.value(),
                    MessagesConstant.EM007,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM007, "Assignment", assignmentId)
            );
        }
        return assignment;
    }

    private ResponseDto<List<MissionTeamAssignedDTO>> getListResponseDto(List<MissionTeamAssigment> assignments) {
        if (assignments.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }
        List<MissionTeamAssignedDTO> dtos = assignments.stream()
                .map(MissionTAMapper::toDTO)
                .collect(Collectors.toList());
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                dtos
        );
    }
}