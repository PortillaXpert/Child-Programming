import { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Divider,
    Stack
} from '@mui/material';
import { getMissionById } from '@/services/api/missionServiceApi';
import { getTeamById } from '@/services/api/teamServiceApi';
import SkeletonCard from '@/components/others/skeletonCard';
import ObjectivesSection from '@/components/missions/ObjectivesSection';
import TimeSection from '@/components/missions/TimeSection';
import StudentItem from '@/components/teams/StudentItem';
import { getAssignmentById } from '@/services/api/assignmentServiceApi';
import FormHeader from '@/components/common/FormHeader';

const statusLabels = {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'En Progreso',
    COMPLETED: 'Completada',
    REVIEWED: 'Revisada',
};

function AssignmentDetailsView({ assignmentId, onBack }) {
    const [assignment, setAssignment] = useState(null);
    const [mission, setMission] = useState(null);
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAssignmentDetails = async () => {
            setLoading(true);
            try {

                const assignmentData = await getAssignmentById(assignmentId);
                setAssignment(assignmentData);

                const [missionData, teamData] = await Promise.all([
                    getMissionById(assignmentData.missionId),
                    getTeamById(assignmentData.teamId)
                ]);

                setMission(missionData);
                setTeam(teamData);
            } catch (err) {
                console.error('Error al cargar detalles de la asignación:', err);
            } finally {
                setLoading(false);
            }
        };

        if (assignmentId) fetchAssignmentDetails();
    }, [assignmentId]);

    if (loading || !assignment || !mission || !team) {
        return <SkeletonCard titleLines={1} items={0} />;
    }

    return (
        <Card
            sx={{
                width: '50vw',
                height: '80vh',
                overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarColor: '#1976D2 white',
                scrollbarWidth: 'thin',
            }}
        >
            <FormHeader title= {'Detalles de la Asignación'} onBack={onBack}></FormHeader>
            <CardContent>
                <Typography variant="h6">{assignment.titleMission}</Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    Estado: {statusLabels[assignment.status] || 'Desconocido'}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight={600}>Misión</Typography>
                <Typography>{mission.description}</Typography>
                <ObjectivesSection objectives={mission.objectives} />
                <TimeSection startDate={mission.startDate} endDate={mission.endDate} />

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight={600}>Equipo</Typography>
                <Typography>Nombre: {assignment.teamName}</Typography>
                <Typography>Curso: {assignment.teamCourse}</Typography>

                <Stack spacing={1} sx={{ mt: 1 }}>
                    {team.students.map((student, idx) => (
                        <StudentItem key={student.id} student={student} index={idx} showCode />
                    ))}
                </Stack>
                <Divider sx={{ my: 2 }} />

                <Typography fontWeight={600}>Tareas Completadas</Typography>
                <Stack spacing={1}>
                    {assignment.tasksCompleted.map((task, idx) => (
                        <Typography key={task.id} variant="body2">
                            <Typography> {idx + 1}. {task.title}</Typography>
                        </Typography>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}

export default AssignmentDetailsView;