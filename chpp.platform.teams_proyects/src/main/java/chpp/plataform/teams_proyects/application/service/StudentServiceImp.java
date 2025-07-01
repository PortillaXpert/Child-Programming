package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Student;
import chpp.plataform.teams_proyects.domain.repository.IStudentRepository;
import chpp.plataform.teams_proyects.domain.service.IStudentService;
import chpp.plataform.teams_proyects.infrastructure.dto.StudentDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.StudentMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StudentServiceImp implements IStudentService {

    private final IStudentRepository studentRepository;

    @Override
    public ResponseDto<List<StudentDTO>> getStudents() {
        List<Student> students = studentRepository.getAll();
        return getListResponseDto(students);
    }

    @Override
    public ResponseDto<List<StudentDTO>> getStudentsByCourse(String course) {
        if (course == null || course.isBlank()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "course")
            );
        }
        List<Student> students = studentRepository.getByCourse(course);
        return getListResponseDto(students);
    }

    private ResponseDto<List<StudentDTO>> getListResponseDto(List<Student> students) {
        if (students == null || students.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }
        List<StudentDTO> studentDTOs = students.stream()
                .map(StudentMapper::toDTO)
                .collect(Collectors.toList());
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                studentDTOs
        );
    }
}