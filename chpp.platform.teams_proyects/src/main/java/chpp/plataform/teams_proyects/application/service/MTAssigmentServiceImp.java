package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.MissionTeamAssigment;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.repository.IMTAssigmentRepository;
import chpp.plataform.teams_proyects.domain.repository.ITaskCompleteRepository;
import chpp.plataform.teams_proyects.domain.service.IMTAssigmentService;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionTAMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
        if (assignmentId == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "assignmentId")
            );
        }

        if (tasks == null || tasks.isEmpty()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "tasks")
            );
        }

        MissionTeamAssigment updatedAssignment = assignmentRepository.updateTasks(assignmentId, tasks);
        MissionTeamAssignedDTO updatedDto = MissionTAMapper.toDTO(updatedAssignment);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedDto
        );
    }

    @Override
    public ResponseDto<MissionTeamAssignedDTO> updateStatus(Long assignmentId, AssignmentStatus status) {
        if (assignmentId == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, "assignmentId")
            );
        }

        if (status == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "status")
            );
        }

        MissionTeamAssigment updatedAssignment = assignmentRepository.updateStatus(assignmentId, status);
        MissionTeamAssignedDTO updatedDto = MissionTAMapper.toDTO(updatedAssignment);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedDto
        );
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
}
