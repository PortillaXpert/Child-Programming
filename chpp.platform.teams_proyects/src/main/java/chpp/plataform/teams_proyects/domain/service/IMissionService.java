package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;

import java.util.List;

public interface IMissionService {
    ResponseDto<MisionDTO> createMission(MisionDTO missionDTO);
    ResponseDto<MisionDTO> updateMission(Long id, MisionDTO missionDTO);
    ResponseDto<List<MisionDTO>> getAllMissions();
    ResponseDto<MisionDTO> getMissionById(Long id);
    ResponseDto<List<MisionDTO>> getActiveMissions();
    ResponseDto<List<MisionDTO>> getInactiveMissions();
    ResponseDto<Void> activateMission(Long missionId);
    ResponseDto<Void> deactivateMission(Long missionId);
}
