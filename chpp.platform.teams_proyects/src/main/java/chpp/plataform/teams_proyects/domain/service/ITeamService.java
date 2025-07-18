package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;

import java.util.List;

public interface ITeamService {
    ResponseDto<TeamDTO> createTeam(TeamDTO teamDto);

    ResponseDto<TeamDTO> updateTeam(Long id, TeamDTO teamDto);

    ResponseDto<TeamDTO> findTeamById(Long teamId);

    ResponseDto<List<TeamDTO>> getTeamsByCourse(String courseId);
    ResponseDto<List<TeamDTO>> getTeams();

    ResponseDto<List<TeamDTO>> getActiveTeams();
    ResponseDto<Void> dissolveTeam(Long teamId);
    ResponseDto<TeamDTO> getTeamByStudentCode(String studentCode);
    ResponseDto<Void> activateTeam(Long teamId);

}