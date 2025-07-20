package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionMapper;
import chpp.plataform.teams_proyects.shared.exceptions.ExceptionsUtils;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import chpp.plataform.teams_proyects.shared.validation.ValidationUtils;
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
        ValidationUtils.validateRequired(missionDTO, "mission");
        missionDTO.setActive(true);

        Mission mission = MissionMapper.toDomain(missionDTO);
        Mission savedMission = missionRepository.save(mission);

        return new ResponseDto<>(
                HttpStatus.CREATED.value(),
                MessagesUtils.get(MessagesConstant.IM002),
                MissionMapper.toDTO(savedMission)
        );
    }

    @Override
    public ResponseDto<List<MisionDTO>> getAllMissions() {
        return buildMissionListResponseDto(missionRepository.findAll());
    }

    @Override
    public ResponseDto<MisionDTO> updateMission(Long id, MisionDTO missionDTO) {
        Mission existingMission = getMissionOrThrow(id);
        ValidationUtils.validateRequired(missionDTO, "mission");

        Mission updatedMission = MissionMapper.toDomain(missionDTO);
        missionRepository.update(id, updatedMission);

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM003),
                MissionMapper.toDTO(updatedMission)
        );
    }

    @Override
    public ResponseDto<MisionDTO> getMissionById(Long id) {
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                MissionMapper.toDTO(getMissionOrThrow(id))
        );
    }

    @Override
    public ResponseDto<List<MisionDTO>> getActiveMissions() {
        List<MisionDTO> missions = missionRepository.findByActiveTrue().stream()
                .map(MissionMapper::toDTO)
                .toList();
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                missions
        );
    }

    @Override
    public ResponseDto<List<MisionDTO>> getInactiveMissions() {
        List<MisionDTO> missions = missionRepository.findByActiveFalse().stream()
                .map(MissionMapper::toDTO)
                .toList();
        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                missions
        );
    }

    @Override
    public ResponseDto<Void> activateMission(Long missionId) {
        getMissionOrThrow(missionId);
        boolean activated = missionRepository.activateMission(missionId);

        if (!activated) {
            throw new BusinessRuleException(
                    HttpStatus.CONFLICT.value(),
                    MessagesConstant.EM011,
                    MessagesUtils.get(MessagesConstant.EM011, "Mission", missionId)
            );
        }

        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessagesUtils.get(MessagesConstant.IM005, "activate"),
                null
        );
    }

    @Override
    public ResponseDto<Void> deactivateMission(Long missionId) {
        getMissionOrThrow(missionId);
        boolean deactivated = missionRepository.deactivateMission(missionId);

        if (!deactivated) {
            throw new BusinessRuleException(
                    HttpStatus.CONFLICT.value(),
                    MessagesConstant.EM011,
                    MessagesUtils.get(MessagesConstant.EM011, "Mission", missionId)
            );
        }

        return new ResponseDto<>(
                HttpStatus.NO_CONTENT.value(),
                MessagesUtils.get(MessagesConstant.IM005, "desactivate"),
                null
        );
    }

    private Mission getMissionOrThrow(Long missionId) {
        ValidationUtils.validateRequired(missionId, "missionId");
        return missionRepository.findById(missionId)
                .orElseThrow(() -> ExceptionsUtils.notFound(MessagesConstant.EM002, missionId));
    }

    private ResponseDto<List<MisionDTO>> buildMissionListResponseDto(List<Mission> missions) {
        if (missions == null || missions.isEmpty()) {
            return new ResponseDto<>(
                    HttpStatus.OK.value(),
                    MessagesUtils.get(MessagesConstant.EM012),
                    Collections.emptyList()
            );
        }

        List<MisionDTO> missionDTOS = missions.stream()
                .map(MissionMapper::toDTO)
                .toList();

        return new ResponseDto<>(
                HttpStatus.OK.value(),
                MessagesUtils.get(MessagesConstant.IM001),
                missionDTOS
        );
    }
}
