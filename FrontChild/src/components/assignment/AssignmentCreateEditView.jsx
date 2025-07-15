import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
    IconButton,
    Tooltip,
    Button,
} from '@mui/material';
import { useEffect, useState } from 'react';
import {
    getMissions,
} from '@/services/api/missionServiceApi';
import {
    getAllTeams,
} from '@/services/api/teamServiceApi';
import {
    createAssignment,
    updateAssignment,
    getAssignmentById,
} from '@/services/api/assignmentServiceApi';
import FormHeader from '@/components/common/FormHeader';
import CustomSnackBar from '@/components/common/ui/CustomSnackBar';
import EntityCardItem from '@/components/common/ui/EntityCardItem';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TeamDetailDialog from '@/components/teams/TeamDetailDialog';
import MissionDetailDialog from '@/components/missions/MissionDetailDialog';
import { statusLabels } from '@/utils/const';

const tooltipStyles = {
    sx: {
        bgcolor: '#1976D2',
        color: 'white',
        fontSize: '0.875rem',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
    },
};


function AssignmentCreateEditView({ assignmentId, onBack }) {
    const [missions, setMissions] = useState([]);
    const [teams, setTeams] = useState([]);
    const [selectedMissionId, setSelectedMissionId] = useState('');
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [status, setStatus] = useState('IN_PROGRESS');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [teamDialogOpen, setTeamDialogOpen] = useState(false);
    const [teamDialogId, setTeamDialogId] = useState(null);
    const [missionDialogOpen, setMissionDialogOpen] = useState(false);
    const [missionDialogId, setMissionDialogId] = useState(null);

    useEffect(() => {
        getMissions().then(setMissions);
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

    const handleOpenTeamDialog = (teamId) => {
        setTeamDialogId(teamId);
        setTeamDialogOpen(true);
    };

    const handleOpenMissionDialog = (missionId) => {
        setMissionDialogId(missionId);
        setMissionDialogOpen(true);
    };

    const handleSave = async () => {
        try {
            const mission = missions.find(m => m.id === selectedMissionId);
            const selectedTeamObjects = teams.filter(t => selectedTeams.includes(t.id));

            if (assignmentId) {
                const team = selectedTeamObjects[0];
                const assignment = {
                    titleMission: mission.title,
                    missionId: mission.id,
                    teamId: team.id,
                    teamName: team.name,
                    teamCourse: team.course,
                    status,
                };
                await updateAssignment(assignmentId, assignment);
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
            }

            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error al guardar asignaciones:', error);
        }
    };

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
                <FormHeader
                    title={assignmentId ? 'Editar Asignación' : 'Asignar Misión a Equipos'}
                    onBack={onBack}
                />
                <CardContent>
                    <Typography fontWeight={600} mb={1}>Selecciona una misión</Typography>
                    <Stack spacing={1}>
                        {missions.map((mission, index) => {
                            const isSelected = mission.id === selectedMissionId;
                            return (
                                <Box key={mission.id} display="flex" alignItems="center">
                                    <Box sx={{ width: '92%' }}>
                                        <EntityCardItem
                                            item={mission}
                                            index={index}
                                            icon={<AssignmentIcon />}
                                            title={mission.title}
                                            subtitle={mission.description}
                                            chipLabel={isSelected ? 'Seleccionada' : ''}
                                            chipColor="#1976D2"
                                            onView={() => handleOpenMissionDialog(mission.id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '8%' }} display="flex" justifyContent="flex-end" gap={1}>
                                        <Tooltip title={isSelected ? 'Quitar misión' : 'Agregar misión'} componentsProps={{ tooltip: tooltipStyles }}>
                                            <IconButton
                                                sx={{ color: '#1976D2' , backgroundColor: 'white', '&:hover': { backgroundColor: '#e3f2fd' } }}
                                                onClick={() =>
                                                    isSelected ? setSelectedMissionId('') : handleMissionSelect(mission.id)
                                                }
                                            >
                                                {isSelected ? <RemoveCircleIcon /> : <AddCircleIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Stack>

                    <Typography fontWeight={600} mt={3} mb={1}>Selecciona equipos</Typography>
                    <Stack spacing={1}>
                        {teams.map((team, index) => {
                            const isSelected = selectedTeams.includes(team.id);
                            return (
                                <Box key={team.id} display="flex" alignItems="center">
                                    <Box sx={{ width: '92%' }}>
                                        <EntityCardItem
                                            item={team}
                                            index={index}
                                            icon={<AssignmentIcon />}
                                            title={team.name}
                                            subtitle={`Curso: ${team.course}`}
                                            chipLabel={isSelected ? 'Asignado' : ''}
                                            chipColor={isSelected ? '#388e3c' : ''}
                                            onView ={() => handleOpenTeamDialog(team.id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '8%' }} display="flex" justifyContent="flex-end" gap={1} componentsProps={{ tooltip: tooltipStyles }}>
                                        <Tooltip title={isSelected ? 'Quitar equipo' : 'Agregar equipo'} >
                                            <IconButton
                                                sx={{ color: '#1976D2' , backgroundColor: 'white', '&:hover': { backgroundColor: '#e3f2fd' } }}
                                                onClick={() => handleToggleTeam(team.id)}
                                            >
                                                {isSelected ? <RemoveCircleIcon /> : <AddCircleIcon />}
                                            </IconButton>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Stack>

                    {assignmentId && (
                        <Typography mt={3}>
                            Estado actual: <strong>{statusLabels[status]}</strong>
                        </Typography>
                    )}

                    <Box display="flex" justifyContent="center" mt={3}>
                        <Button
                            onClick={handleSave}
                            variant="contained"
                            sx={{ bgcolor: '#1976D2' }}
                            disabled={!selectedMissionId || selectedTeams.length === 0}
                        >
                            {assignmentId ? 'Guardar Cambios' : 'Asignar Misión'}
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            <CustomSnackBar
                message={assignmentId ? '¡Asignación actualizada con éxito!' : '¡Asignaciones creadas con éxito!'}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity="success"
            />

            <TeamDetailDialog
                open={teamDialogOpen}
                onClose={() => setTeamDialogOpen(false)}
                teamId={teamDialogId}
            />

            <MissionDetailDialog
                open={missionDialogOpen}
                onClose={() => setMissionDialogOpen(false)}
                missionId={missionDialogId}
            />
        </>
    );
}

export default AssignmentCreateEditView;