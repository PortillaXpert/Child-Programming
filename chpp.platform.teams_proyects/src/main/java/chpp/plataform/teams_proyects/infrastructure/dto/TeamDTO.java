package chpp.plataform.teams_proyects.infrastructure.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class TeamDTO {
    private Long id;
    private String name;
    private String course;
    private List<StudentDTO> students;
}
