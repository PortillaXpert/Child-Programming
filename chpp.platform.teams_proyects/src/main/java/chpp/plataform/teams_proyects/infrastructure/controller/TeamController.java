package chpp.plataform.teams_proyects.infrastructure.controller;


import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.ITeamService;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@Log4j2
@RestController
@RequestMapping("/teams")
@Tag(name = "Teams Controller", description = "Manejo de equipos de ChildProgramming")
@RequiredArgsConstructor
public class TeamController {

    private final ITeamService teamService;

    @PostMapping
    @Operation(summary = "Crear un nuevo equipo")
    @ApiResponse(responseCode = "201", description = "Equipo creado exitosamente")
    public ResponseEntity<ResponseDto<TeamDTO>> createTeam(@Valid @RequestBody TeamDTO teamDTO) {
        ResponseDto<TeamDTO> response = teamService.createTeam(teamDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    @Operation(summary = "Obtener todos los equipos")
    @ApiResponse(responseCode = "200", description = "Pagina de Equipos")
    public ResponseEntity<ResponseDto<PagedResponseDTO<TeamDTO>>> getAllTeams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ResponseDto<PagedResponseDTO<TeamDTO>> response = teamService.getTeams(page, size);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/active")
    @Operation(summary = "Obtener equipos activos")
    @ApiResponse(responseCode = "200", description = "Pagina de equipos activos")
    public ResponseEntity<ResponseDto<PagedResponseDTO<TeamDTO>>> getActiveTeams(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        ResponseDto<PagedResponseDTO<TeamDTO>> response = teamService.getActiveTeams(page, size);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un equipo existente / Reasignar estudiante a otro equipo")
    @ApiResponse(responseCode = "200", description = "Equipo actualizado exitosamente")
    public ResponseEntity<ResponseDto<TeamDTO>> updateTeam(
            @PathVariable Long id,
            @Valid @RequestBody TeamDTO teamDTO) {
        ResponseDto<TeamDTO> response = teamService.updateTeam(id, teamDTO);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Obtener equipo por ID")
    @ApiResponse(responseCode = "200", description = "Equipo encontrado")
    public ResponseEntity<ResponseDto<TeamDTO>> getTeamById(@PathVariable Long id) {
        ResponseDto<TeamDTO> response = teamService.findTeamById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Obtener equipos activos por curso")
    @ApiResponse(responseCode = "200", description = "Lista de equipos por curso")
    public ResponseEntity<ResponseDto<PagedResponseDTO<TeamDTO>>> getTeamsByCourse(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @PathVariable String courseId) {
        ResponseDto<PagedResponseDTO<TeamDTO>> response = teamService.getTeamsByCourse(page, size, courseId);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{teamId}")
    @Operation(summary = "Disolver equipo")
    @ApiResponse(responseCode = "204", description = "Equipo disuelto")
    public ResponseEntity<ResponseDto<Void>> dissolveTeam(@PathVariable Long teamId) {
        ResponseDto<Void> response = teamService.dissolveTeam(teamId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }

    @GetMapping("/student/{studentCode}")
    @Operation(summary = "Obtener equipo por código de estudiante")
    @ApiResponse(responseCode = "200", description = "Equipo encontrado por código de estudiante")
    public ResponseEntity<ResponseDto<TeamDTO>> getTeamByStudentCode(@PathVariable String studentCode) {
        ResponseDto<TeamDTO> response = teamService.getTeamByStudentCode(studentCode);
        return ResponseEntity.ok(response);
    }
}