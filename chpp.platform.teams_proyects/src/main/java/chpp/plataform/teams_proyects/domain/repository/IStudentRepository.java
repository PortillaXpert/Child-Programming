package chpp.plataform.teams_proyects.domain.repository;

import chpp.plataform.teams_proyects.domain.model.Student;

import java.util.List;

public interface IStudentRepository {
    List<Student> getAll();
    List<Student> getByCourse(String course);
}
