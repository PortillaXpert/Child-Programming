package chpp.plataform.teams_proyects.infrastructure.repository.imp;

import chpp.plataform.teams_proyects.domain.model.Student;
import chpp.plataform.teams_proyects.domain.repository.IStudentRepository;
import chpp.plataform.teams_proyects.infrastructure.mappers.StudentEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.IJpaStudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@RequiredArgsConstructor
@Transactional
public class StudentRepositoryImp implements IStudentRepository {

    private final IJpaStudentRepository jpaStudentRepository;

    @Override
    public List<Student> getAll() {
        return jpaStudentRepository.findAll()
                .stream().map(StudentEntityMapper::toDomain).toList();

    }

    @Override
    public List<Student> getByCourse(String course) {
        return jpaStudentRepository.findByCourse(course).stream()
                .map(StudentEntityMapper::toDomain)
                .toList();
    }
}
