package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Team;
import chpp.plataform.teams_proyects.domain.repository.ITeamRepository;
import chpp.plataform.teams_proyects.domain.service.ITeamService;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.TeamMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamServiceImp implements ITeamService {

    private final ITeamRepository teamRepository;

    @Override
    public ResponseDto<TeamDTO> createTeam(TeamDTO teamDto) {
        validateTeamDTO(teamDto);
        Team team = TeamMapper.toDomain(teamDto);
        Team createdTeam = teamRepository.create(team);
        TeamDTO createdTeamDto = TeamMapper.toDTO(createdTeam);
        //TODO: Verificar si el estudiante ya está en otro equipo antes de crear uno nuevo
        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM002),
                createdTeamDto
        );
    }

    @Override
    public ResponseDto<TeamDTO> updateTeam(Long id, TeamDTO teamDto) {
        Team existingTeam = getTeamOrThrow(id);
        validateTeamDTO(teamDto);
        Team team = TeamMapper.toDomain(teamDto);
        team.setId(id);
        Team updatedTeam = teamRepository.update(id, team);
        TeamDTO updatedTeamDto = TeamMapper.toDTO(updatedTeam);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                updatedTeamDto
        );
    }

    @Override
    public ResponseDto<List<TeamDTO>> getTeamsByCourse(String courseId) {
        if (courseId == null || courseId.isBlank()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "courseId")
            );
        }
        List<Team> teams = teamRepository.findByCourseId(courseId);
        return getListResponseDto(teams);
    }

    @Override
    public ResponseDto<List<TeamDTO>> getTeams() {
        List<Team> teams = teamRepository.findAll();
        return getListResponseDto(teams);
    }

    @Override
    public ResponseDto<Void> reassignStudent(Long studentId, Long newTeamId) {
        validateId(studentId, "studentId");
        if (!teamRepository.existsById(newTeamId)) {
            throw new BusinessRuleException(
                    HttpStatus.NOT_FOUND.value(),
                    MessagesConstant.EM002,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM002, newTeamId)
            );
        }
        teamRepository.reassignStudent(studentId, newTeamId);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                null
        );
    }

    @Override
    public ResponseDto<Void> dissolveTeam(Long teamId) {
        getTeamOrThrow(teamId);
        teamRepository.dissolve(teamId);
        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM004),
                null
        );
    }

    @Override
    public ResponseDto<TeamDTO> getTeamByStudentCode(String studentCode) {
        if (studentCode == null || studentCode.isBlank()) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "studentCode")
            );
        }
        Team team = teamRepository.getTeamByStudentCode(studentCode);
        if (team == null) {
            throw new BusinessRuleException(
                    HttpStatus.NOT_FOUND.value(),
                    MessagesConstant.EM002,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM002, studentCode)
            );
        }
        TeamDTO teamDto = TeamMapper.toDTO(team);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                teamDto
        );
    }

    @Override
    public ResponseDto<TeamDTO> findTeamById(Long teamId) {
        Team team = getTeamOrThrow(teamId);
        TeamDTO teamDto = TeamMapper.toDTO(team);
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                teamDto
        );
    }


    private void validateTeamDTO(TeamDTO dto) {
        if (dto == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM004,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM004, "team")
            );
        }

    }

    private void validateId(Long id, String fieldName) {
        if (id == null) {
            throw new BusinessRuleException(
                    HttpStatus.BAD_REQUEST.value(),
                    MessagesConstant.EM006,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM006, fieldName)
            );
        }
    }

    private Team getTeamOrThrow(Long teamId) {
        validateId(teamId, "teamId");
        return teamRepository.findById(teamId)
                .orElseThrow(() -> new BusinessRuleException(
                        HttpStatus.NOT_FOUND.value(),
                        MessagesConstant.EM002,
                        MessageLoader.getInstance().getMessage(MessagesConstant.EM002, teamId)
                ));
    }

    private ResponseDto<List<TeamDTO>> getListResponseDto(List<Team> teams) {
        if (teams == null || teams.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }
        List<TeamDTO> teamDTOs = teams.stream()
                .map(TeamMapper::toDTO)
                .collect(Collectors.toList());
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                teamDTOs
        );
    }
}