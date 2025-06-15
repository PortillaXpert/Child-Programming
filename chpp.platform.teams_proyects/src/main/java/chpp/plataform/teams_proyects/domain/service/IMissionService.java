package chpp.plataform.teams_proyects.domain.service;

import chpp.plataform.teams_proyects.domain.model.Mission;

import java.util.List;

public interface IMissionService {
    Mission createMission(Mission mission);
    Mission getActiveMission();
    List<Mission> getMissionHistory();
    List<Mission> getMissions();
    void updateMission(Mission mission);
    void desactivateMission(Long missionId);
}
