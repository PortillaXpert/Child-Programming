package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.infrastructure.dto.StudentDTO;

import java.util.List;

public interface IStudentService {
    ResponseDto<List<StudentDTO>> getStudents();
    ResponseDto<List<StudentDTO>> getStudentsByCourse(String course);
}
