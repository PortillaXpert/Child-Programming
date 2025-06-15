package chpp.plataform.teams_proyects.infrastructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    private Long id;
    private Long studentCod;
    private String fullName;
}
