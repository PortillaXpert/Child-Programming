package chpp.plataform.teams_proyects.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {
    private Long id;
    private Long studentCod;
    private String fullName;
    private String email;
    private Long teamId;
}