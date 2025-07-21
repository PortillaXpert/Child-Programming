import {
    Box, Card, CardContent, Stack, Typography, Button,
    Select, MenuItem
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import FormHeader from '@/components/common/FormHeader';
import CustomSnackBar from '@/components/common/ui/CustomSnackBar';
import EntityCardItem from '@/components/common/ui/EntityCardItem';
import TeamDetailDialog from '@/components/teams/TeamDetailDialog';
import MissionDetailDialog from '@/components/missions/MissionDetailDialog';
import TooltipIconButton from '@/components/common/ui/TooltipIconButton';
import StarIcon from '@/components/icon/StarIcon';
import { statusOptions, statusLabels } from '@/utils/const';
import { useState } from 'react';
import { useAssignmentForm } from '@/hooks/formHooks/useAssignmentForm';
import CustomPagination from '@/components/common/ui/CustomPagination';

function AssignmentCreateEditView({ assignmentId, onBack }) {
    const {
        missions,
        missionsLoading,
        missionPage,
        setMissionPage,
        totalMissionPages,
        teams,
        teamsLoading,
        teamPage,
        setTeamPage,
        totalTeamPages,
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
    } = useAssignmentForm(assignmentId);


    const [teamDialogOpen, setTeamDialogOpen] = useState(false);
    const [teamDialogId, setTeamDialogId] = useState(null);
    const [missionDialogOpen, setMissionDialogOpen] = useState(false);
    const [missionDialogId, setMissionDialogId] = useState(null);

    const handleOpenTeamDialog = (teamId) => {
        setTeamDialogId(teamId);
        setTeamDialogOpen(true);
    };

    const handleOpenMissionDialog = (missionId) => {
        setMissionDialogId(missionId);
        setMissionDialogOpen(true);
    };

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto' ,scrollbarColor: '#1976D2 white',
                scrollbarWidth: 'thin',}}>
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
                                            icon={<StarIcon color='white' />}
                                            title={mission.title}
                                            subtitle={mission.description}
                                            chipLabel={isSelected ? 'Seleccionada' : ''}
                                            chipColor="#1976D2"
                                            onView={() => handleOpenMissionDialog(mission.id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '8%' }} display="flex" justifyContent="flex-end">
                                        <TooltipIconButton
                                            title={isSelected ? 'Quitar misión' : 'Seleccionar misión'}
                                            icon={isSelected ? <RemoveCircleIcon /> : <AddCircleIcon />}
                                            onClick={() =>
                                                isSelected ? handleMissionSelect('') : handleMissionSelect(mission.id)
                                            }
                                            disabled={!!assignmentId}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                        <CustomPagination
                        totalPages={totalMissionPages}
                        page={missionPage}
                        setPage={setMissionPage}
                        />
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
                                            icon={<img src="/caticon.svg" alt="Ícono gato" style={{ width: 24 }} />}
                                            title={team.name}
                                            subtitle={`Curso: ${team.course}`}
                                            chipLabel={isSelected ? 'Asignado' : ''}
                                            chipColor={isSelected ? '#388e3c' : ''}
                                            onView={() => handleOpenTeamDialog(team.id)}
                                        />
                                    </Box>
                                    <Box sx={{ width: '8%' }} display="flex" justifyContent="flex-end">
                                        <TooltipIconButton
                                            title={isSelected ? 'Quitar equipo' : 'Seleccionar equipo'}
                                            icon={isSelected ? <RemoveCircleIcon /> : <AddCircleIcon />}
                                            onClick={() => handleToggleTeam(team.id)}
                                            disabled={!!assignmentId}
                                        />
                                    </Box>
                                </Box>
                            );
                        })}
                        <CustomPagination
                        totalPages={totalTeamPages}
                        page={teamPage}
                        setPage={setTeamPage}
                        />
                    </Stack>

                    {assignmentId && (
                        <Select value={status} onChange={e => setStatus(e.target.value)} fullWidth sx={{ mt: 2 }}>
                            {statusOptions.map(opt => (
                                <MenuItem key={opt.value} value={opt.value}>
                                    {statusLabels[opt.value]}
                                </MenuItem>
                            ))}
                        </Select>
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
                message={snackbarMessage}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity={severity}
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
