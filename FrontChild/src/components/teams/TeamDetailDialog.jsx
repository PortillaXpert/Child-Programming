import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Stack,
    IconButton,
    Box,
    Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useEffect, useState } from 'react'
import StudentItem from '@/components/teams/StudentItem';
import { getTeamById, updateTeam } from '@/services/api/teamServiceApi';
import ConfirmDialog from '@/components/others/ConfirmDialog';

function TeamDetailDialog({ open, onClose, teamId }) {
    const [team, setTeam] = useState(null)
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [confirmOpen, setConfirmOpen] = useState(false)

    useEffect(() => {
        if (open && teamId) {
            getTeamById(teamId)
                .then((data) => setTeam(data))
                .catch((err) => console.error('Error al cargar detalles del equipo:', err))
        }
    }, [open, teamId])

    const handleDeleteStudent = async () => {
        if (!selectedStudent || !team) return
        const updatedStudents = team.students.filter(s => s.id !== selectedStudent.id)
        const updatedTeam = { ...team, students: updatedStudents }

        try {
            const response = await updateTeam(team.id, updatedTeam)
            setTeam(response)
            setSelectedStudent(null)
            setConfirmOpen(false)
        } catch (err) {
            console.error('Error al eliminar estudiante:', err)
        }
    }

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ bgcolor: '#1976D2', color: 'white' }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography fontWeight={600}>Detalles del Equipo</Typography>
                        <IconButton onClick={onClose} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>

                <DialogContent dividers>
                    {team ? (
                        <>
                            <Typography variant="h6" gutterBottom>{team.name}</Typography>
                            <Typography variant="subtitle1" gutterBottom color="text.secondary">
                                Curso: {team.course}
                            </Typography>

                            <Typography fontWeight={600} sx={{ mt: 2, mb: 1 }}>Estudiantes</Typography>
                            <Stack spacing={1}>
                                {team.students.map((student, idx) => (
                                    <StudentItem student={student} index={idx} showCode />
                                ))}
                                </Stack>
                        </>
                    ) : (
                        <Typography color="text.secondary">Cargando...</Typography>
                    )}
                </DialogContent>

                <DialogActions>
                    <Button onClick={onClose} variant="contained" sx={{ bgcolor: '#1976D2' }}>
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>

            <ConfirmDialog
                open={confirmOpen}
                title="¿Eliminar estudiante?"
                content={`¿Estás seguro de que deseas eliminar a ${selectedStudent?.fullName} del equipo?`}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteStudent}
            />
        </>
    )
}

export default TeamDetailDialog
