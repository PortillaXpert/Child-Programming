package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Student;
import chpp.plataform.teams_proyects.infrastructure.entity.StudentEntity;

public class StudentEntityMapper {

    public static StudentEntity toEntity(Student student) {
        if (student == null) return null;

        return StudentEntity.builder()
                .id(student.getId())
                .studentCod(student.getStudentCod())
                .fullName(student.getFullName())
                .email(student.getEmail())
                .build();
    }

    public static Student toDomain(StudentEntity entity) {
        if (entity == null) return null;

        return new Student(
                entity.getId(),
                entity.getStudentCod(),
                entity.getFullName(),
                entity.getEmail()
        );
    }
}