package chpp.plataform.teams_proyects.infrastructure.controller;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.service.IMTAssigmentService;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TestMTAssignmentController {
    @Mock
    private IMTAssigmentService assignmentService;

    @InjectMocks
    private MissionTAController missionTAController;

    private MissionTeamAssignedDTO assignmentDTO;
    private final Long assignmentId = 1L;
    private final Long teamId = 1L;

    @BeforeEach
    void setUp() {
        assignmentDTO = new MissionTeamAssignedDTO();
        assignmentDTO.setId(assignmentId);
        assignmentDTO.setTeamId(teamId);
        assignmentDTO.setMissionId(1L);
        assignmentDTO.setStatus(AssignmentStatus.IN_PROGRESS);
    }

    @Test
    void createAssignment_ShouldReturnCreated() {
        // Arrange
        ResponseDto<MissionTeamAssignedDTO> expectedResponse = new ResponseDto<>(
                HttpStatus.CREATED.value(), "Created", assignmentDTO);

        when(assignmentService.createAssignment(any(MissionTeamAssignedDTO.class)))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> response =
                missionTAController.createAssignment(assignmentDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        verify(assignmentService).createAssignment(assignmentDTO);
    }

    @Test
    void getAllAssignments_ShouldReturnOk() {
        // Arrange
        List<MissionTeamAssignedDTO> assignments = Arrays.asList(assignmentDTO);
        ResponseDto<List<MissionTeamAssignedDTO>> expectedResponse = new ResponseDto<>(
                HttpStatus.OK.value(), "Success", assignments);

        when(assignmentService.getAllMissionTeamAssigned())
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<List<MissionTeamAssignedDTO>>> response =
                missionTAController.getAllAssignments();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        verify(assignmentService).getAllMissionTeamAssigned();
    }

    @Test
    void getAssignmentsByTeam_ShouldReturnOk() {
        // Arrange
        List<MissionTeamAssignedDTO> assignments = Arrays.asList(assignmentDTO);
        ResponseDto<List<MissionTeamAssignedDTO>> expectedResponse = new ResponseDto<>(
                HttpStatus.OK.value(), "Success", assignments);

        when(assignmentService.getAssignmentsByTeam(teamId))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<List<MissionTeamAssignedDTO>>> response =
                missionTAController.getAssignmentsByTeam(teamId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        verify(assignmentService).getAssignmentsByTeam(teamId);
    }

    @Test
    void updateAssignmentTasks_ShouldReturnOk() {
        // Arrange
        List<TaskComplete> tasks = Arrays.asList(new TaskComplete());
        ResponseDto<MissionTeamAssignedDTO> expectedResponse = new ResponseDto<>(
                HttpStatus.OK.value(), "Tasks updated", assignmentDTO);

        when(assignmentService.updateTasks(assignmentId, tasks))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> response =
                missionTAController.updateAssignmentTasks(assignmentId, tasks);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        verify(assignmentService).updateTasks(assignmentId, tasks);
    }

    @Test
    void updateAssignmentStatus_ShouldReturnOk() {
        // Arrange
        AssignmentStatus newStatus = AssignmentStatus.COMPLETED;
        ResponseDto<MissionTeamAssignedDTO> expectedResponse = new ResponseDto<>(
                HttpStatus.OK.value(), "Status updated", assignmentDTO);

        when(assignmentService.updateStatus(assignmentId, newStatus))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> response =
                missionTAController.updateAssignmentStatus(assignmentId, newStatus);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        verify(assignmentService).updateStatus(assignmentId, newStatus);
    }

    @Test
    void deleteAssignment_ShouldReturnNotImplemented() {
        // Act
        ResponseEntity<ResponseDto<Void>> response =
                missionTAController.deleteAssignment(assignmentId);

        // Assert
        assertEquals(HttpStatus.NOT_IMPLEMENTED, response.getStatusCode());
    }

    @Test
    void getAssignmentById_ShouldReturnNotImplemented() {
        // Act
        ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> response =
                missionTAController.getAssignmentById(assignmentId);

        // Assert
        assertEquals(HttpStatus.NOT_IMPLEMENTED, response.getStatusCode());
    }
}
