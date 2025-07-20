package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;


public interface IMissionService {
    ResponseDto<MisionDTO> createMission(MisionDTO missionDTO);
    ResponseDto<MisionDTO> updateMission(Long id, MisionDTO missionDTO);
    ResponseDto<PagedResponseDTO<MisionDTO>> getAllMissions(int page, int size);
    ResponseDto<MisionDTO> getMissionById(Long id);
    ResponseDto<PagedResponseDTO<MisionDTO>>  getActiveMissions(int page, int size);
    ResponseDto<PagedResponseDTO<MisionDTO>>  getInactiveMissions(int page, int size);
    ResponseDto<Void> activateMission(Long missionId);
    ResponseDto<Void> deactivateMission(Long missionId);
}
