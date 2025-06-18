package chpp.plataform.teams_proyects.infrastructure.repository.jpa;

import chpp.plataform.teams_proyects.infrastructure.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IJpaStudentRepository extends JpaRepository<StudentEntity, Long> {
}
