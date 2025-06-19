package chpp.plataform.teams_proyects.infrastructure.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class TestMissionController {

    @Mock
    private IMissionService missionService;

    @InjectMocks
    private MissionController missionController;

    private MisionDTO missionDTO;
    private final Long missionId = 1L;

    @BeforeEach
    void setUp() {
        missionDTO = new MisionDTO();
        missionDTO.setId(missionId);
        missionDTO.setTitle("Misión de prueba");
        missionDTO.setDescription("Descripción de misión de prueba");
        missionDTO.setObjectives(Arrays.asList("Objetivo 1", "Objetivo 2"));
        missionDTO.setStartDate(LocalDateTime.now());
        missionDTO.setEndDate(LocalDateTime.now().plusDays(7));
        // materials puede ser null o una lista vacía para las pruebas
    }

    @Test
    void createMission_ShouldReturnCreatedStatus() {
        // Arrange
        ResponseDto<MisionDTO> expectedResponse = new ResponseDto<>(
                HttpStatus.CREATED.value(),
                "Misión creada exitosamente",
                missionDTO);

        when(missionService.createMission(any(MisionDTO.class))).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MisionDTO>> response =
                missionController.createMission(missionDTO);

        // Assert
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(missionDTO, response.getBody().getData());
        assertEquals("Misión creada exitosamente", response.getBody().getMessage());
        verify(missionService).createMission(missionDTO);
    }

    @Test
    void getAllMissions_ShouldReturnOkStatus() {
        // Arrange
        List<MisionDTO> missions = Arrays.asList(missionDTO);
        ResponseDto<List<MisionDTO>> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misiones obtenidas",
                        missions);

        when(missionService.getAllMissions()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<List<MisionDTO>>> response =
                missionController.getAllMissions();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(1, response.getBody().getData().size());
        assertEquals("Misiones obtenidas", response.getBody().getMessage());
        verify(missionService).getAllMissions();
    }

    @Test
    void getMissionById_ShouldReturnOkStatus() {
        // Arrange
        ResponseDto<MisionDTO> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misión encontrada",
                        missionDTO);

        when(missionService.getMissionById(missionId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MisionDTO>> response =
                missionController.getMissionById(missionId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(missionDTO, response.getBody().getData());
        assertEquals("Misión encontrada", response.getBody().getMessage());
        verify(missionService).getMissionById(missionId);
    }

    @Test
    void updateMission_ShouldReturnOkStatus() {
        // Arrange
        ResponseDto<MisionDTO> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misión actualizada",
                        missionDTO);

        when(missionService.updateMission(eq(missionId), any(MisionDTO.class)))
                .thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<MisionDTO>> response =
                missionController.updateMission(missionId, missionDTO);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(missionDTO, response.getBody().getData());
        assertEquals("Misión actualizada", response.getBody().getMessage());
        verify(missionService).updateMission(missionId, missionDTO);
    }

    @Test
    void getActiveMissions_ShouldReturnOkStatus() {
        // Arrange
        List<MisionDTO> activeMissions = Arrays.asList(missionDTO);
        ResponseDto<List<MisionDTO>> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misiones activas obtenidas",
                        activeMissions);

        when(missionService.getActiveMissions()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<List<MisionDTO>>> response =
                missionController.getActiveMissions();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(1, response.getBody().getData().size());
        assertEquals("Misiones activas obtenidas", response.getBody().getMessage());
        verify(missionService).getActiveMissions();
    }

    @Test
    void getInactiveMissions_ShouldReturnOkStatus() {
        // Arrange
        List<MisionDTO> inactiveMissions = Arrays.asList(missionDTO);
        ResponseDto<List<MisionDTO>> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misiones inactivas obtenidas",
                        inactiveMissions);

        when(missionService.getInactiveMissions()).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<List<MisionDTO>>> response =
                missionController.getInactiveMissions();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertEquals(1, response.getBody().getData().size());
        assertEquals("Misiones inactivas obtenidas", response.getBody().getMessage());
        verify(missionService).getInactiveMissions();
    }

    @Test
    void activateMission_ShouldReturnOkStatus() {
        // Arrange
        ResponseDto<Void> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misión activada");

        when(missionService.activateMission(missionId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<Void>> response =
                missionController.activateMission(missionId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertNull(response.getBody().getData());
        assertEquals("Misión activada", response.getBody().getMessage());
        verify(missionService).activateMission(missionId);
    }

    @Test
    void deactivateMission_ShouldReturnOkStatus() {
        // Arrange
        ResponseDto<Void> expectedResponse =
                new ResponseDto<>(HttpStatus.OK.value(),
                        "Misión desactivada");

        when(missionService.deactivateMission(missionId)).thenReturn(expectedResponse);

        // Act
        ResponseEntity<ResponseDto<Void>> response =
                missionController.deactivateMission(missionId);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
        assertNull(response.getBody().getData());
        assertEquals("Misión desactivada", response.getBody().getMessage());
        verify(missionService).deactivateMission(missionId);
    }

}