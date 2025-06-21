package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.TaskCompleteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJpaTaskCompleteRepository extends JpaRepository<TaskCompleteEntity, Long> {
}
