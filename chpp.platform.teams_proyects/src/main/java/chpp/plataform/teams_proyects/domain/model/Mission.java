package chpp.plataform.teams_proyects.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mission {
    private Long id;
    private String title;
    private String description;
    private List<String> objectives;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private boolean active;
    private List<Team> teams;
    private List<Attachment> materials;
}