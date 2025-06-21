package chpp.plataform.teams_proyects.infrastructure.controller;


import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@Log4j2
@RestController
@RequestMapping("/missions")
@Tag(name = "Missions Controller", description = "Gestión de misiones de ChildProgramming")
@RequiredArgsConstructor
public class MissionController {

    private final IMissionService missionService;

    @PostMapping
    @Operation(summary = "Crear una nueva misión")
    @ApiResponse(responseCode = "201", description = "Misión creada exitosamente")
    public ResponseEntity<ResponseDto<MisionDTO>> createMission(@RequestBody MisionDTO missionDTO) {
        ResponseDto<MisionDTO> response = missionService.createMission(missionDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Obtener todas las misiones")
    @ApiResponse(responseCode = "200", description = "Lista de misiones")
    public ResponseEntity<ResponseDto<List<MisionDTO>>> getAllMissions() {
        ResponseDto<List<MisionDTO>> response = missionService.getAllMissions();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener misión por ID")
    @ApiResponse(responseCode = "200", description = "Misión encontrada")
    public ResponseEntity<ResponseDto<MisionDTO>> getMissionById(@PathVariable Long id) {
        ResponseDto<MisionDTO> response = missionService.getMissionById(id);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar una misión existente")
    @ApiResponse(responseCode = "200", description = "Misión actualizada exitosamente")
    public ResponseEntity<ResponseDto<MisionDTO>> updateMission(
            @PathVariable Long id,
            @RequestBody MisionDTO missionDTO) {
        ResponseDto<MisionDTO> response = missionService.updateMission(id, missionDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    @Operation(summary = "Obtener misiones activas")
    @ApiResponse(responseCode = "200", description = "Lista de misiones activas")
    public ResponseEntity<ResponseDto<List<MisionDTO>>> getActiveMissions() {
        ResponseDto<List<MisionDTO>> response = missionService.getActiveMissions();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/inactive")
    @Operation(summary = "Obtener misiones inactivas")
    @ApiResponse(responseCode = "200", description = "Lista de misiones inactivas")
    public ResponseEntity<ResponseDto<List<MisionDTO>>> getInactiveMissions() {
        ResponseDto<List<MisionDTO>> response = missionService.getInactiveMissions();
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/activate")
    @Operation(summary = "Activar una misión")
    @ApiResponse(responseCode = "200", description = "Misión activada exitosamente")
    public ResponseEntity<ResponseDto<Void>> activateMission(@PathVariable Long id) {
        ResponseDto<Void> response = missionService.activateMission(id);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/desactivate")
    @Operation(summary = "Desactivar una misión")
    @ApiResponse(responseCode = "200", description = "Misión desactivada exitosamente")
    public ResponseEntity<ResponseDto<Void>> deactivateMission(@PathVariable Long id) {
        ResponseDto<Void> response = missionService.deactivateMission(id);
        return ResponseEntity.ok(response);
    }

}