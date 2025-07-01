package chpp.plataform.teams_proyects.infrastructure.controller;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.service.IStudentService;
import chpp.plataform.teams_proyects.infrastructure.dto.StudentDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/students")
@Tag(name = "Students Controller", description = "Manejo de estudiantes de ChildProgramming")
@RequiredArgsConstructor
public class StudentController {

    private final IStudentService studentService;

    @GetMapping
    @Operation(summary = "Obtener todos los estudiantes")
    @ApiResponse(responseCode = "200", description = "Lista de estudiantes")
    public ResponseEntity<ResponseDto<List<StudentDTO>>> getAllStudents() {
        ResponseDto<List<StudentDTO>> response = studentService.getStudents();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/course/{courseId}")
    @Operation(summary = "Obtener estudiantes por curso")
    @ApiResponse(responseCode = "200", description = "Lista de estudiantes por curso")
    public ResponseEntity<ResponseDto<List<StudentDTO>>> getStudentsByCourse(
            @PathVariable String courseId) {
        ResponseDto<List<StudentDTO>> response = studentService.getStudentsByCourse(courseId);
        return ResponseEntity.ok(response);
    }
}