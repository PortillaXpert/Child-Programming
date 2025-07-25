package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.infrastructure.dto.TeamDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;

import java.util.List;

public interface ITeamService {
    ResponseDto<TeamDTO> createTeam(TeamDTO teamDto);

    ResponseDto<TeamDTO> updateTeam(Long id, TeamDTO teamDto);

    ResponseDto<TeamDTO> findTeamById(Long teamId);

    ResponseDto<PagedResponseDTO<TeamDTO>> getTeamsByCourse(int page, int size,List<String> courses);
    ResponseDto<PagedResponseDTO<TeamDTO>> getTeams(int page, int size);

    ResponseDto<PagedResponseDTO<TeamDTO>> getActiveTeams(int page, int size);
    ResponseDto<Void> dissolveTeam(Long teamId);
    ResponseDto<TeamDTO> getTeamByStudentCode(String studentCode);
    ResponseDto<Void> activateTeam(Long teamId);

}