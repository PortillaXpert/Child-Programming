package chpp.plataform.teams_proyects.infrastructure.mappers;

import chpp.plataform.teams_proyects.domain.model.Student;
import chpp.plataform.teams_proyects.infrastructure.dto.StudentDTO;

public class StudentMapper {

    public static StudentDTO toDTO(Student student) {
        return new StudentDTO(
                student.getId(),
                student.getStudentCod(),
                student.getFullName()
        );
    }

    public static Student toDomain(StudentDTO dto) {
        return new Student(
                dto.getId(),
                dto.getStudentCod(),
                dto.getFullName(),null
        );
    }
}
