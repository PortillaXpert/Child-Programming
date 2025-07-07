import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Stack,
    TextField,
    Typography,
    Snackbar,
    Alert,
} from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { getTeamById, updateTeam, createTeam } from '../../../../services/api/teamServiceApi'
import ConfirmDialog from '../../../others/ConfirmDialog'
import StudentItem from '../../../teams/StudentItem'

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6']
const getColorByIndex = (index) => colors[index % colors.length]

function TeamEditView({ teamId, onBack }) {
    const [team, setTeam] = useState({ name: '', course: '', students: [] })
    const [newStudent, setNewStudent] = useState({ fullName: '', studentCod: '' })
    const [errors, setErrors] = useState({ fullName: '', studentCod: '' })
    const [teamErrors, setTeamErrors] = useState({ name: '', course: '' })
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState(null)
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const navigate = useNavigate()
    const message = teamId ? '¡Equipo actualizado correctamente!' : '¡Equipo guardado con éxito!'

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

    const validateTeamFields = () => {
        const newTeamErrors = { name: '', course: '' }
        let isValid = true

        if (!team.name.trim()) {
            newTeamErrors.name = 'El nombre del equipo es obligatorio.'
            isValid = false
        }
        if (!team.course.trim()) {
            newTeamErrors.course = 'El curso es obligatorio.'
            isValid = false
        }

        setTeamErrors(newTeamErrors)
        return isValid
    }

    const validateInputs = () => {
        const newErrors = { fullName: '', studentCod: '' }
        let isValid = true

        if (!newStudent.fullName.trim()) {
            newErrors.fullName = 'El nombre no puede estar vacío.'
            isValid = false
        }

        if (!newStudent.studentCod.trim()) {
            newErrors.studentCod = 'El código no puede estar vacío.'
            isValid = false
        } else if (!/^\d+$/.test(newStudent.studentCod)) {
            newErrors.studentCod = 'El código debe ser numérico.'
            isValid = false
        } else if (team.students.some(s => s.studentCod === newStudent.studentCod.trim())) {
            newErrors.studentCod = 'Este código ya está registrado.'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
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
        if (!validateInputs()) return

        const newEntry = {
            fullName: newStudent.fullName.trim(),
            studentCod: newStudent.studentCod.trim(),
            course: team.course,
        }

        setTeam((prev) => ({
            ...prev,
            students: [...prev.students, newEntry],
        }))
        setNewStudent({ fullName: '', studentCod: '' })
        setErrors({ fullName: '', studentCod: '' })
        setTeamErrors((prev) => ({ ...prev, students: '' }))
    }

    const handleSave = async () => {
        const teamValid = validateTeamFields()
        if (!teamValid) return
        if (team.students.length === 0) {
            setTeamErrors((prev) => ({ ...prev, students: 'Debe agregar al menos un estudiante.' }))
            return
        }
        try {
            if (teamId) {
                await updateTeam(team.id, team)
            } else {
                await createTeam(team)
            }
            navigate(`/home`)
            setSnackbarOpen(true)
            onBack()
        } catch (err) {
            console.error('Error al guardar equipo:', err)
        }
    }

    if (!team) return <Typography>Cargando equipo...</Typography>

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
                <CardHeader
                    sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <IconButton onClick={onBack} sx={{ color: 'white' }}>
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6">{teamId ? 'Editar Equipo' : 'Crear Equipo'}</Typography>
                        </Box>
                    }
                />
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
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%', backgroundColor: '#5be031', color: 'white' }}
                >
                    {message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default TeamEditView
