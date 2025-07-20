import { useEffect, useState } from 'react';
import {
    getAssignmentById,
    createAssignment,
    updateAssignment
} from '@/services/api/assignmentServiceApi';
import { getAllTeams } from '@/services/api/teamServiceApi';
import { getActiveMissions } from '@/services/api/missionServiceApi';
import { useFetchPaginatedData } from '@/hooks/dataHooks/useFecthPaginatedData';

export function useAssignmentForm(assignmentId) {
    const {
        data: missions,
        loading: missionsLoading,
        page: missionPage,
        setPage: setMissionPage,
        totalPages: totalMissionPages,
    } = useFetchPaginatedData(getActiveMissions);

    const [teams, setTeams] = useState([]);
    const [selectedMissionId, setSelectedMissionId] = useState('');
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [status, setStatus] = useState('IN_PROGRESS');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    useEffect(() => {
        getAllTeams().then(setTeams);

        if (assignmentId) {
            getAssignmentById(assignmentId).then(data => {
                setSelectedMissionId(data.missionId);
                setSelectedTeams([data.teamId]);
                setStatus(data.status);
            });
        }
    }, [assignmentId]);

    const handleMissionSelect = (missionId) => {
        setSelectedMissionId(missionId);
    };

    const handleToggleTeam = (teamId) => {
        setSelectedTeams(prev =>
            prev.includes(teamId)
                ? prev.filter(id => id !== teamId)
                : [...prev, teamId]
        );
    };

    const handleSave = async () => {
        try {
            const mission = missions.find(m => m.id === selectedMissionId);
            const selectedTeamObjects = teams.filter(t => selectedTeams.includes(t.id));

            if (!mission || selectedTeamObjects.length === 0) {
                setSnackbarMessage('Debes seleccionar una misión y al menos un equipo.');
                setSeverity('error');
                setSnackbarOpen(true);
                return;
            }

            if (assignmentId) {
                await updateAssignment(assignmentId, status);
                setSnackbarMessage('¡Asignación actualizada con éxito!');
            } else {
                for (const team of selectedTeamObjects) {
                    const assignment = {
                        titleMission: mission.title,
                        missionId: mission.id,
                        teamId: team.id,
                        teamName: team.name,
                        teamCourse: team.course,
                        status: 'IN_PROGRESS',
                    };
                    await createAssignment(assignment);
                }
                setSnackbarMessage('¡Asignaciones creadas con éxito!');
            }

            setSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error al guardar asignaciones:', error);
            setSnackbarMessage('Error al guardar asignaciones. Intente nuevamente.');
            setSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return {
        missions,
        missionsLoading,
        missionPage,
        setMissionPage,
        totalMissionPages,
        teams,
        selectedMissionId,
        selectedTeams,
        status,
        snackbarOpen,
        snackbarMessage,
        severity,
        setStatus,
        setSnackbarOpen,
        handleMissionSelect,
        handleToggleTeam,
        handleSave,
    };
}
