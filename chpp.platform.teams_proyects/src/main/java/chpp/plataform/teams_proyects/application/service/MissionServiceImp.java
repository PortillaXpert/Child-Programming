package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionMapper;
import chpp.plataform.teams_proyects.infrastructure.messages.MessageLoader;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


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
    public ResponseDto<List<MisionDTO>> getAllMissions() {
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
        Mission existingMission = missionRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException(
                        HttpStatus.NOT_FOUND.value(),
                        MessagesConstant.EM002,
                        MessageLoader.getInstance().getMessage(MessagesConstant.EM002, id)
                ));

        Mission updatedMission = MissionMapper.toDomain(missionDTO);
        missionRepository.save(updatedMission);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                MissionMapper.toDTO(updatedMission)
        );
    }

    @Override
    public ResponseDto<MisionDTO> getMissionById(Long id) {
        Mission mission = missionRepository.findById(id)
                .orElseThrow(() -> new BusinessRuleException(
                        HttpStatus.NOT_FOUND.value(),
                        MessagesConstant.EM002,
                        MessageLoader.getInstance().getMessage(MessagesConstant.EM002, id)
                ));

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                MissionMapper.toDTO(mission)
        );
    }

    @Override
    public ResponseDto<List<MisionDTO>> getActiveMissions() {
        List<MisionDTO> missions = missionRepository.findByActiveTrue().stream()
                .map(MissionMapper::toDTO)
                .collect(Collectors.toList());

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                missions
        );
    }

    @Override
    public ResponseDto<List<MisionDTO>> getInactiveMissions() {
        List<MisionDTO> missions = missionRepository.findByActiveFalse().stream()
                .map(MissionMapper::toDTO)
                .collect(Collectors.toList());

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM001),
                missions
        );
    }

    @Override
    public ResponseDto<Void> activateMission(Long missionId) {
        if (missionRepository.findById(missionId).isEmpty()) {
            throw new BusinessRuleException(
                    HttpStatus.NOT_FOUND.value(),
                    MessagesConstant.EM002,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM002, missionId)
            );
        }

        boolean activated = missionRepository.activateMission(missionId);
        if (!activated) {
            throw new BusinessRuleException(
                    HttpStatus.CONFLICT.value(),
                    MessagesConstant.EM011,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM011, "Mission", missionId)
            );
        }

        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM003),
                null
        );
    }

    @Override
    public ResponseDto<Void> deactivateMission(Long missionId) {
        if (missionRepository.findById(missionId).isEmpty()) {
            throw new BusinessRuleException(
                    HttpStatus.NOT_FOUND.value(),
                    MessagesConstant.EM002,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM002, missionId)
            );
        }

        boolean deactivated = missionRepository.deactivateMission(missionId);
        if (!deactivated) {
            throw new BusinessRuleException(
                    HttpStatus.CONFLICT.value(),
                    MessagesConstant.EM011,
                    MessageLoader.getInstance().getMessage(MessagesConstant.EM011, "Mission", missionId)
            );
        }

        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessageLoader.getInstance().getMessage(MessagesConstant.IM004),
                null
        );
    }
}
