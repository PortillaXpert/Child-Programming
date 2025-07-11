import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import { getTeamById, updateTeam, createTeam } from '@/services/api/teamServiceApi'
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog'
import StudentItem from '@/components/teams/StudentItem'
import FormHeader from '@/components/common/FormHeader'
import CustomSnackBar from '@/components/common/ui/CustomSnackBar'
import { validateTeamFields, validateStudentInputs } from '@/utils/validators/teamsValidators';

function TeamCreateEditView({ teamId, onBack }) {
    const [team, setTeam] = useState({ name: '', course: '', students: [] })
    const [newStudent, setNewStudent] = useState({ fullName: '', studentCod: '' })
    const [errors, setErrors] = useState({ fullName: '', studentCod: '' })
    const [teamErrors, setTeamErrors] = useState({ name: '', course: '' })
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    useEffect(() => {
        if (teamId) {
            getTeamById(teamId)
                .then(setTeam)
                .catch((err) => console.error('Error al cargar equipo:', err))
        }
    }, [teamId])

    const handleChange = (field, value) => {
        setTeam((prev) => ({ ...prev, [field]: value }))
        setTeamErrors((prev) => ({ ...prev, [field]: '' }))
    }


    const confirmDeleteStudent = (student) => {
        setStudentToDelete(student)
        setConfirmOpen(true)
    }

    const handleDeleteStudent = () => {
        if (!studentToDelete) return
        setTeam((prev) => ({
            ...prev,
            students: prev.students.filter((s) => s !== studentToDelete),
        }))
        setConfirmOpen(false)
        setStudentToDelete(null)
    }

    const handleAddStudent = () => {
        const newEntry = {
            fullName: newStudent.fullName.trim(),
            studentCod: newStudent.studentCod.trim(),
            course: team.course,
        };
        
        const { isValid, errors } = validateStudentInputs(newEntry, team.students);

        setErrors(errors);
        if (!isValid) return;
    

        setTeam((prev) => ({
            ...prev,
            students: [...prev.students, newEntry],
        }))
        setNewStudent({ fullName: '', studentCod: '' })
        setTeamErrors((prev) => ({ ...prev, students: '' }))
    }

    const handleSave = async () => {
        const { isValid, errors } = validateTeamFields(team);
        setTeamErrors(errors);
        if (!isValid) return;
    
        if (team.students.length < 2) {
            setTeamErrors(prev => ({ ...prev, students: 'Debe agregar al menos dos estudiantes.' }));
            return;
        }
    
        try {
            if (teamId) {
                await updateTeam(team.id, team);
            } else {
                await createTeam(team);
            }
            setSnackbarOpen(true);
        } catch (err) {
            console.error('Error al guardar equipo:', err);
        }
    };

    if (!team) return <Typography>Cargando equipo...</Typography>

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
                <FormHeader title= {teamId ? 'Editar Equipo' : 'Crear Equipo'} onBack={onBack}></FormHeader>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Nombre del equipo"
                            value={team.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            error={!!teamErrors.name}
                            helperText={teamErrors.name}
                            fullWidth
                        />
                        <TextField
                            label="Curso"
                            value={team.course}
                            onChange={(e) => handleChange('course', e.target.value)}
                            error={!!teamErrors.course}
                            helperText={teamErrors.course}
                            fullWidth
                        />

                        <Typography fontWeight={600}>Estudiantes</Typography>
                        {team.students.map((student, idx) => (
                            <StudentItem
                                key={idx}
                                student={student}
                                index={idx}
                                showCode
                                onDelete={confirmDeleteStudent}
                            />
                        ))}
                        {teamErrors.students && (
                        <Typography color="error" variant="body2" sx={{ ml: 1 }}>
                            {teamErrors.students}
                        </Typography>
                        )}

                        <Typography fontWeight={600}>Agregar Estudiante</Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Nombre completo"
                                value={newStudent.fullName}
                                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                                error={!!errors.fullName}
                                helperText={errors.fullName}
                                fullWidth
                            />
                            <TextField
                                label="Código"
                                value={newStudent.studentCod}
                                onChange={(e) => setNewStudent({ ...newStudent, studentCod: e.target.value })}
                                error={!!errors.studentCod}
                                helperText={errors.studentCod}
                                fullWidth
                            />
                            <IconButton onClick={handleAddStudent} sx={{ alignSelf: 'center' }}>
                                <AddIcon />
                            </IconButton>
                        </Stack>

                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#1976D2' }}>
                                Guardar Cambios
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>

            <ConfirmDialog
                open={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={handleDeleteStudent}
                title="¿Eliminar estudiante?"
                content={`¿Estás seguro de que deseas eliminar a ${studentToDelete?.fullName || 'este estudiante'}?`}
            />
            <CustomSnackBar
                message={teamId ? '¡Equipo actualizado correctamente!' : '¡Equipo guardado con éxito!'}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity="success"
            />
        </>
    )
}

export default TeamCreateEditView
