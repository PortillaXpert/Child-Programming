package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;



@Service
@RequiredArgsConstructor
public class MissionServiceImp implements IMissionService {

    private final IMissionRepository missionRepository;

    @Override
    public ResponseDto<MisionDTO> createMission(MisionDTO missionDTO) {
        Mission mission = MissionMapper.toDomain(missionDTO);
        Mission savedMission = missionRepository.save(mission);
        MisionDTO savedMissionDTO = MissionMapper.toDTO(savedMission);
        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM002),
                savedMissionDTO
        );
    }

    @Override
    public  ResponseDto<List<MisionDTO>> getAllMissions() {
        List<Mission> allMissions = missionRepository.findAll();
        if (allMissions.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }
        List<MisionDTO> missionDTOS = allMissions.stream()
                .map(MissionMapper::toDTO)
                .toList();

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                missionDTOS
        );
    }

    @Override
    public ResponseDto<MisionDTO> updateMission(Long id, MisionDTO missionDTO) {
        return null;
    }

    @Override
    public ResponseDto<MisionDTO> getMissionById(Long id) {
        return null;
    }

    @Override
    public ResponseDto<List<MisionDTO>> getActiveMissions() {
        return null;
    }

    @Override
    public ResponseDto<List<MisionDTO>> getInactiveMissions() {
        return null;
    }

    @Override
    public ResponseDto<Void> activateMission(Long missionId) {
        return null;
    }

    @Override
    public ResponseDto<Void> deactivateMission(Long missionId) {
        return null;
    }
}
