package chpp.plataform.teams_proyects.infrastructure.entity;


import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.StudentEntity;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.TeamEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "team_students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnrollEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    private List<TeamEntity> team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private List<StudentEntity> student;
}
