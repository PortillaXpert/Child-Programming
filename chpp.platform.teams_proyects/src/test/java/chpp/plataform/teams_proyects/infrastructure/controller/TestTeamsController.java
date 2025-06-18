package chpp.plataform.teams_proyects.infrastructure.controller;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.ITeamService;
import chpp.plataform.teams_proyects.infrastructure.dto.StudentDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
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
class TestTeamsController {

    @Mock
    private ITeamService teamService;

    @InjectMocks
    private TeamController teamController;

    private TeamDTO teamDTOWithStudents;
    private final Long teamId = 1L;
    private final String courseId = "CS101";
    private final String successMessage = "Operación exitosa";

    @BeforeEach
    void setUp() {

        StudentDTO student1 = new StudentDTO(1L, 1001L, "Juan Pérez");
        StudentDTO student2 = new StudentDTO(2L, 1002L, "María García");

        teamDTOWithStudents = new TeamDTO(
                teamId,
                "Equipo A",
                courseId,
                Arrays.asList(student1, student2)
        );
    }

    @Test
    void createTeam_shouldReturnCreatedWithCorrectMessageAndBody() {
        // Arrange
        ResponseDto<TeamDTO> serviceResponse = new ResponseDto<>(
                HttpStatus.CREATED.value(),
                successMessage,
                teamDTOWithStudents
        );

        when(teamService.createTeam(any(TeamDTO.class))).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<TeamDTO>> response = teamController.createTeam(teamDTOWithStudents);

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.CREATED, response.getStatusCode()),
                () -> assertEquals(successMessage, response.getBody().getMessage()),
                () -> assertEquals(teamDTOWithStudents, response.getBody().getData()),
                () -> assertEquals(2, response.getBody().getData().getStudents().size()),
                () -> verify(teamService).createTeam(teamDTOWithStudents)
        );
    }

    @Test
    void getAllTeams_shouldVerifyMessageAndStudentList() {
        // Arrange
        List<TeamDTO> teams = Arrays.asList(teamDTOWithStudents);
        ResponseDto<List<TeamDTO>> serviceResponse = new ResponseDto<>(
                HttpStatus.OK.value(),
                "Listado obtenido",
                teams
        );

        when(teamService.getTeams()).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<List<TeamDTO>>> response = teamController.getAllTeams();

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals("Listado obtenido", response.getBody().getMessage()),
                () -> assertEquals(1, response.getBody().getData().size()),
                () -> assertEquals(2, response.getBody().getData().get(0).getStudents().size()),
                () -> verify(teamService).getTeams()
        );
    }

    @Test
    void updateTeam_shouldValidateInputAndOutput() {
        // Arrange
        ResponseDto<TeamDTO> serviceResponse = new ResponseDto<>(
                HttpStatus.OK.value(),
                "Equipo actualizado",
                teamDTOWithStudents
        );

        when(teamService.updateTeam(eq(teamId), any(TeamDTO.class))).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<TeamDTO>> response = teamController.updateTeam(teamId, teamDTOWithStudents);

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals("Equipo actualizado", response.getBody().getMessage()),
                () -> assertEquals(teamId, response.getBody().getData().getId()),
                () -> verify(teamService).updateTeam(teamId, teamDTOWithStudents)
        );
    }

    @Test
    void getTeamById_shouldCheckNotFoundScenario() {
        // Arrange
        when(teamService.findTeamById(anyLong())).thenReturn(
                new ResponseDto<>(HttpStatus.NOT_FOUND.value(), "Equipo no encontrado", null)
        );

        // Act
        ResponseEntity<ResponseDto<TeamDTO>> response = teamController.getTeamById(999L);

        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals("Equipo no encontrado", response.getBody().getMessage()),
                () -> assertNull(response.getBody().getData())
        );
    }

    @Test
    void getTeamsByCourse_shouldVerifyCourseFiltering() {
        // Arrange
        ResponseDto<List<TeamDTO>> serviceResponse = new ResponseDto<>(
                HttpStatus.OK.value(),
                "Equipos del curso " + courseId,
                Arrays.asList(teamDTOWithStudents)
        );

        when(teamService.getTeamsByCourse(anyString())).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<List<TeamDTO>>> response = teamController.getTeamsByCourse(courseId);

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertTrue(response.getBody().getMessage().contains(courseId)),
                () -> assertEquals(1, response.getBody().getData().size()),
                () -> verify(teamService).getTeamsByCourse(courseId)
        );
    }

    @Test
    void reassignStudent_shouldValidateParametersAndResponse() {
        // Arrange
        Long studentId = 1L;
        Long newTeamId = 2L;
        ResponseDto<Void> serviceResponse = new ResponseDto<>(
                HttpStatus.OK.value(),
                "Estudiante reasignado correctamente",
                null
        );

        when(teamService.reassignStudent(studentId, newTeamId)).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<Void>> response = teamController.reassignStudent(studentId, newTeamId);

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.OK, response.getStatusCode()),
                () -> assertEquals("Estudiante reasignado correctamente", response.getBody().getMessage()),
                () -> assertNull(response.getBody().getData()),
                () -> verify(teamService).reassignStudent(studentId, newTeamId)
        );
    }

    @Test
    void dissolveTeam_shouldReturnCorrectStatusAndMessage() {
        // Arrange
        ResponseDto<Void> serviceResponse = new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                "Equipo eliminado satisfactoriamente",
                null
        );

        when(teamService.dissolveTeam(teamId)).thenReturn(serviceResponse);

        // Act
        ResponseEntity<ResponseDto<Void>> response = teamController.dissolveTeam(teamId);

        // Assert
        assertAll(
                () -> assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode()),
                () -> assertEquals("Equipo eliminado satisfactoriamente", response.getBody().getMessage()),
                () -> verify(teamService).dissolveTeam(teamId)
        );
    }

    @Test
    void dissolveTeam_shouldHandleServiceException() {
        // Arrange
        String errorMessage = "Error al eliminar equipo";
        when(teamService.dissolveTeam(teamId))
                .thenThrow(new RuntimeException(errorMessage));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, () -> {
            teamController.dissolveTeam(teamId);
        });

        assertEquals(errorMessage, exception.getMessage());
    }


}