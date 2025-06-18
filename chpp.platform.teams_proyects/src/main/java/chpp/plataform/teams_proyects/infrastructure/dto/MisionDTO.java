package chpp.plataform.teams_proyects.infrastructure.dto;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MisionDTO {
    private Long id;
    @NotBlank(message = "El título de la misión no puede estar vacío")
    private String title;

    @NotBlank(message = "La descripción de la misión no puede estar vacía")

    private String description;

    @NotNull(message = "Los objetivos no pueden ser nulos")
    @NotEmpty(message = "Debe haber al menos un objetivo")
    private List<@NotBlank(message = "El objetivo no puede estar vacío") String> objectives;

    @NotNull(message = "La fecha de inicio es obligatoria")
    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private List<AttachmentDTO> materials;
}
