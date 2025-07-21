package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.model.Student;
import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.domain.repository.ITeamRepository;
import chpp.plataform.teams_proyects.domain.service.ITeamService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;
import chpp.plataform.teams_proyects.infrastructure.entity.teams_proyecs_entities.StudentEntity;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.StudentMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamEntityMapper;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamMapper;
import chpp.plataform.teams_proyects.infrastructure.repository.jpa.IJpaStudentRepository;
import chpp.plataform.teams_proyects.shared.exceptions.ExceptionsUtils;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import chpp.plataform.teams_proyects.shared.validation.ValidationUtils;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImp implements ITeamService {

    private final ITeamRepository teamRepository;
    private final IJpaStudentRepository jpaStudentRepository;

    @Override
    public ResponseDto<TeamDTO> createTeam(TeamDTO teamDto) {
        ValidationUtils.validateRequired(teamDto, "team");

        Team team = TeamMapper.toDomain(teamDto);
        team.setStudents(null);
        team.setActive(true);
        Team createdTeam = teamRepository.create(team);
        List<Student> students = teamDto.getStudents().stream()
                .map(StudentMapper::toDomain).collect(Collectors.toList());

        assignStudentsToTeam(students, createdTeam, null);

        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessagesUtils.get(MessagesConstant.IM002),
                TeamMapper.toDTO(createdTeam)
        );
    }

    @Transactional
    @Override
    public ResponseDto<TeamDTO> updateTeam(Long id, TeamDTO teamDto) {
        Team existingTeam = getTeamOrThrow(id);
        ValidationUtils.validateRequired(teamDto, "team");

        Team team = TeamMapper.toDomain(teamDto);
        team.setId(id);
        team.setActive(true);

        assignStudentsToTeam(team.getStudents(), existingTeam, id);

        Team updatedTeam = teamRepository.update(id, team);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                TeamMapper.toDTO(updatedTeam)
        );
    }

    private void assignStudentsToTeam(List<Student> students, Team team, Long currentTeamId) {
        if (students == null || students.isEmpty()) return;

        List<StudentEntity> existingStudents = validateAndGetExistingStudents(students);
        validateAllStudentsFromSameCourse(existingStudents);
        validateStudentsNotInOtherTeams(existingStudents, currentTeamId);

        if (currentTeamId == null) {
            for (StudentEntity student : existingStudents) {
                student.setTeam(TeamEntityMapper.toEntity(team));
            }
            jpaStudentRepository.saveAll(existingStudents);
        } else {
            List<Long> newStudentCodes = students.stream()
                    .map(Student::getStudentCod)
                    .toList();
            syncStudentAssignments(currentTeamId, newStudentCodes);
        }
    }

    private List<StudentEntity> validateAndGetExistingStudents(List<Student> students) {
        List<Long> studentCodes = students.stream()
                .map(Student::getStudentCod)
                .toList();

        List<StudentEntity> existingStudents = jpaStudentRepository.findByStudentCodIn(studentCodes);

        List<Long> missingCodes = studentCodes.stream()
                .filter(code -> existingStudents.stream()
                        .noneMatch(s -> s.getStudentCod().equals(code)))
                .toList();

        if (!missingCodes.isEmpty()) {
            throw new EntityNotFoundException("Estudiantes no encontrados con códigos: " + missingCodes);
        }

        return existingStudents;
    }

    private void validateAllStudentsFromSameCourse(List<StudentEntity> students) {
        Set<String> courseIds = students.stream()
                .map(StudentEntity::getCourse)
                .collect(Collectors.toSet());

        if (courseIds.size() > 1) {
            throw new IllegalArgumentException("Todos los estudiantes deben pertenecer al mismo curso.");
        }
    }

    private void validateStudentsNotInOtherTeams(List<StudentEntity> students, Long currentTeamId) {
        List<Long> studentsInOtherTeams = students.stream()
                .filter(s -> s.getTeam() != null
                        && s.getTeam().isActive()
                        && !s.getTeam().getId().equals(currentTeamId))
                .map(StudentEntity::getStudentCod)
                .toList();

        if (!studentsInOtherTeams.isEmpty()) {
            throw new IllegalStateException("Estudiantes ya asignados a equipos activos: " + studentsInOtherTeams);
        }
    }

    private void syncStudentAssignments(Long teamId, List<Long> newStudentCodes) {
        Team existingTeamEntity = getTeamOrThrow(teamId);

        Set<Long> currentStudentCodes = existingTeamEntity.getStudents().stream()
                .map(Student::getStudentCod)
                .collect(Collectors.toSet());

        Set<Long> toRemove = new HashSet<>(currentStudentCodes);
        newStudentCodes.forEach(toRemove::remove);

        Set<Long> toAdd = new HashSet<>(newStudentCodes);
        toAdd.removeAll(currentStudentCodes);

        if (!toRemove.isEmpty()) {
            jpaStudentRepository.removeTeamAssignment(teamId, toRemove);
        }

        if (!toAdd.isEmpty()) {
            jpaStudentRepository.assignToTeam(teamId, toAdd);
        }
    }

    @Override
    public ResponseDto<PagedResponseDTO<TeamDTO>> getTeamsByCourse(int page, int size,String courseId) {
        ValidationUtils.validateRequired(courseId, "courseId");
        return buildPagedResponseDto(teamRepository.findByCourseId(PageRequest.of(page, size),courseId));
    }

    @Override
    public ResponseDto<PagedResponseDTO<TeamDTO>> getTeams(int page, int size) {
        return buildPagedResponseDto(teamRepository.findAll(PageRequest.of(page, size)));
    }

    @Override
    public ResponseDto<Void> activateTeam(Long teamId) {
        ValidationUtils.validateRequired(teamId, "teamId");
        getTeamOrThrow(teamId);
        teamRepository.activateTeam(teamId);
        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessagesUtils.get(MessagesConstant.IM005),
                null
        );
    }

    @Override
    public ResponseDto<PagedResponseDTO<TeamDTO>> getActiveTeams(int page, int size) {
        return buildPagedResponseDto(teamRepository.getTeamsActive(PageRequest.of(page, size)));
    }

    @Override
    public ResponseDto<Void> dissolveTeam(Long teamId) {
        getTeamOrThrow(teamId);
        teamRepository.dissolve(teamId);
        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessagesUtils.get(MessagesConstant.IM004),
                null
        );
    }



    @Override
    public ResponseDto<TeamDTO> getTeamByStudentCode(String studentCode) {
        ValidationUtils.validateRequired(studentCode, "studentCode");

        Team team = teamRepository.getTeamByStudentCode(studentCode);
        if (team == null) {
            throw ExceptionsUtils.notFound(MessagesConstant.EM002, studentCode);
        }

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                TeamMapper.toDTO(team)
        );
    }

    @Override
    public ResponseDto<TeamDTO> findTeamById(Long teamId) {
        Team team = getTeamOrThrow(teamId);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                TeamMapper.toDTO(team)
        );
    }

    private Team getTeamOrThrow(Long teamId) {
        ValidationUtils.validateRequired(teamId, "teamId");
        return teamRepository.findById(teamId)
                .orElseThrow(() -> ExceptionsUtils.notFound(MessagesConstant.EM002, teamId));
    }

    private ResponseDto<PagedResponseDTO<TeamDTO>> buildPagedResponseDto(Page<Team> page) {
        List<TeamDTO> content = page.getContent()
                .stream()
                .map(TeamMapper::toDTO)
                .toList();

        PagedResponseDTO<TeamDTO> response = new PagedResponseDTO<>(
                page.getNumber(),
                page.getTotalPages(),
                page.getTotalElements(),
                content,
                page.isLast()
        );

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                response
        );
    }
}
