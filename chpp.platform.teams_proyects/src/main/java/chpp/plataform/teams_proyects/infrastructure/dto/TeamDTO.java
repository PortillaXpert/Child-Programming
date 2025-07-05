package chpp.plataform.teams_proyects.infrastructure.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TeamDTO {
    private Long id;
    @NotBlank(message = "El nombre del equipo no puede estar vacío")
    private String name;

    @NotBlank(message = "El ID del curso no puede estar vacío")
    private String course;

    @NotNull(message = "La lista de estudiantes no puede ser nula")
    @NotEmpty(message = "Debe haber al menos un estudiante")
    private List<StudentDTO> students;
    private boolean active = true;
}
