package chpp.plataform.teams_proyects.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Team {
    private Long id;
    private String name;
    private String course;
    private List<Student> students;
}