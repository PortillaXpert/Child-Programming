package chpp.plataform.teams_proyects.application.service;

import chpp.plataform.teams_proyects.domain.common.ResponseDto;
import chpp.plataform.teams_proyects.domain.constant.MessagesConstant;
import chpp.plataform.teams_proyects.domain.model.Mission;
import chpp.plataform.teams_proyects.domain.repository.IMissionRepository;
import chpp.plataform.teams_proyects.domain.service.IMissionService;
import chpp.plataform.teams_proyects.infrastructure.dto.MisionDTO;
import chpp.plataform.teams_proyects.infrastructure.dto.common.PagedResponseDTO;
import chpp.plataform.teams_proyects.infrastructure.exceptions.BusinessRuleException;
import chpp.plataform.teams_proyects.infrastructure.mappers.MissionMapper;
import chpp.plataform.teams_proyects.shared.exceptions.ExceptionsUtils;
import chpp.plataform.teams_proyects.shared.messages.MessagesUtils;
import chpp.plataform.teams_proyects.shared.validation.ValidationUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


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
    public ResponseDto<PagedResponseDTO<MisionDTO>> getAllMissions(int page, int size) {
        Page<Mission> missionsPage = missionRepository.findAll(PageRequest.of(page, size));
        return buildPagedResponseDto(missionsPage);
    }

    @Override
    public ResponseDto<PagedResponseDTO<MisionDTO>> getActiveMissions(int page, int size) {
        Page<Mission> missionsPage = missionRepository.findByActiveTrue(PageRequest.of(page, size));
        return buildPagedResponseDto(missionsPage);
    }

    @Override
    public ResponseDto<PagedResponseDTO<MisionDTO>> getInactiveMissions(int page, int size) {
        Page<Mission> missionsPage = missionRepository.findByActiveFalse(PageRequest.of(page, size));
        return buildPagedResponseDto(missionsPage);
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

    private ResponseDto<PagedResponseDTO<MisionDTO>> buildPagedResponseDto(Page<Mission> page) {
        List<MisionDTO> content = page.getContent()
                .stream()
                .map(MissionMapper::toDTO)
                .toList();

        PagedResponseDTO<MisionDTO> response = new PagedResponseDTO<>(
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
