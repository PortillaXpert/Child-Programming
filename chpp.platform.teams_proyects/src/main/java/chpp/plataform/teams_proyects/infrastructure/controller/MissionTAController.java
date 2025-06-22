package chpp.plataform.teams_proyects.infrastructure.controller;


import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.model.AssignmentStatus;
import chpp.plataform.teams_proyects.domain.model.TaskComplete;
import chpp.plataform.teams_proyects.domain.service.IMTAssigmentService;
import chpp.plataform.teams_proyects.infrastructure.dto.MissionTeamAssignedDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/mission-assignments")
@Tag(name = "Mission Assignments Controller", description = "Gestión de asignaciones de misiones a equipos")
@RequiredArgsConstructor
public class MissionTAController {

    private final IMTAssigmentService assignmentService;

    @PostMapping
    @Operation(summary = "Crear una nueva asignación de misión a equipo")
    @ApiResponse(responseCode = "201", description = "Asignación creada exitosamente")
    public ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> createAssignment(
            @Valid @RequestBody MissionTeamAssignedDTO assignmentDTO) {
        ResponseDto<MissionTeamAssignedDTO> response = assignmentService.createAssignment(assignmentDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las asignaciones de misiones")
    @ApiResponse(responseCode = "200", description = "Lista de asignaciones")
    public ResponseEntity<ResponseDto<List<MissionTeamAssignedDTO>>> getAllAssignments() {
        ResponseDto<List<MissionTeamAssignedDTO>> response = assignmentService.getAllMissionTeamAssigned();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/team/{teamId}")
    @Operation(summary = "Obtener asignaciones por equipo")
    @ApiResponse(responseCode = "200", description = "Lista de asignaciones para el equipo")
    public ResponseEntity<ResponseDto<List<MissionTeamAssignedDTO>>> getAssignmentsByTeam(
            @PathVariable Long teamId) {
        ResponseDto<List<MissionTeamAssignedDTO>> response = assignmentService.getAssignmentsByTeam(teamId);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{assignmentId}")
    @Operation(summary = "Obtener asignación por ID")
    @ApiResponse(responseCode = "200", description = "Asignación encontrada")
    public ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> getAssignmentById(
            @PathVariable Long assignmentId) {
        ResponseDto<MissionTeamAssignedDTO> response = assignmentService.getAssignmentById(assignmentId);
       return ResponseEntity.ok(response);
    }

    //TODO: Corregir el método de actualización de asignación
    @PatchMapping("/{assignmentId}/tasks")
    @Operation(summary = "Actualizar tareas de una asignación")
    @ApiResponse(responseCode = "200", description = "Tareas actualizadas exitosamente")
    public ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> updateAssignmentTasks(
            @PathVariable Long assignmentId,
            @RequestBody List<TaskComplete> tasks) {
        ResponseDto<MissionTeamAssignedDTO> response = assignmentService.updateTasks(assignmentId, tasks);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{assignmentId}/status")
    @Operation(summary = "Actualizar estado de una asignación")
    @ApiResponse(responseCode = "200", description = "Estado actualizado exitosamente")
    public ResponseEntity<ResponseDto<MissionTeamAssignedDTO>> updateAssignmentStatus(
            @PathVariable Long assignmentId,
            @RequestParam AssignmentStatus status) {
        ResponseDto<MissionTeamAssignedDTO> response = assignmentService.updateStatus(assignmentId, status);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{assignmentId}")
    @Operation(summary = "Eliminar asignación")
    @ApiResponse(responseCode = "204", description = "Asignación eliminada")
    public ResponseEntity<ResponseDto<Void>> deleteAssignment(
            @PathVariable Long assignmentId) {
        assignmentService.delete(assignmentId);
       return ResponseEntity.noContent().build();
    }
}