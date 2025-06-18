package chpp.plataform.teams_proyects.infrastructure.controller;


import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.ITeamService;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
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
import org.springframework.web.bind.annotation.PatchMapping;
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
    @ApiResponse(responseCode = "200", description = "Lista de Equipos")
    public ResponseEntity<ResponseDto<List<TeamDTO>>>  getAllTeams() {
        ResponseDto<List<TeamDTO>> response = teamService.getTeams();
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar un equipo existente")
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
    @Operation(summary = "Obtener equipos por curso")
    @ApiResponse(responseCode = "200", description = "Lista de equipos por curso")
    public ResponseEntity<ResponseDto<List<TeamDTO>>> getTeamsByCourse(
            @PathVariable String courseId) {
        ResponseDto<List<TeamDTO>> response = teamService.getTeamsByCourse(courseId);
        return ResponseEntity.ok(response);
    }

    //TODO
    @PatchMapping("/students/{studentId}/reassign")
    @Operation(summary = "Reasignar estudiante a otro equipo")
    @ApiResponse(responseCode = "200", description = "Estudiante reasignado")
    public ResponseEntity<ResponseDto<Void>> reassignStudent(
            @PathVariable Long studentId,
            @RequestParam Long newTeamId) {
        ResponseDto<Void> response = teamService.reassignStudent(studentId, newTeamId);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/{teamId}")
    @Operation(summary = "Disolver equipo")
    @ApiResponse(responseCode = "204", description = "Equipo disuelto")
    public ResponseEntity<ResponseDto<Void>> dissolveTeam(@PathVariable Long teamId) {
        ResponseDto<Void> response = teamService.dissolveTeam(teamId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(response);
    }
}