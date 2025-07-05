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
    Avatar,
    Chip
} from '@mui/material'
import { useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { getTeamById, updateTeam, createTeam } from '../../../../services/api/teamServiceApi'
import ConfirmDialog from '../../../others/ConfirmDialog'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6']
const getColorByIndex = (index) => colors[index % colors.length]

function TeamEditView({ teamId, onBack }) {
    const [team, setTeam] = useState({ name: '', course: '', students: [] })
    const [newStudent, setNewStudent] = useState({ fullName: '', studentCod: '' })
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState(null)
    const navigate = useNavigate()
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const message = teamId ? 'Equipo actualizado correctamente.' : 'Equipo creado correctamente.'

    useEffect(() => {
        if (teamId) {
            getTeamById(teamId)
                .then(setTeam)
                .catch((err) => console.error('Error al cargar equipo:', err))
        }
    }, [teamId])

    const handleChange = (field, value) => {
        setTeam((prev) => ({ ...prev, [field]: value }))
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
        if (!newStudent.fullName || !newStudent.studentCod) return
        const newEntry = {
            fullName: newStudent.fullName,
            studentCod: newStudent.studentCod,
            course: team.course,
        }
        setTeam((prev) => ({
            ...prev,
            students: [...prev.students, newEntry],
        }))
        setNewStudent({ fullName: '', studentCod: '' })
    }

    const handleSave = async () => {
        
        try {
            if (teamId) {
                await updateTeam(team.id, team)
                navigate(`/home`)
                setSnackbarOpen(true) 
            } else {
                await createTeam(team)
                navigate(`/home`)
                setSnackbarOpen(true) 
            }
            onBack()
        } catch (err) {
            console.error('Error al guardar equipo:', err)
        }
    }

    if (!team) return <Typography>Cargando equipo...</Typography>

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto', overflowX: 'hidden',
                scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin'}}>
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
                            fullWidth
                        />
                        <TextField
                            label="Curso"
                            value={team.course}
                            onChange={(e) => handleChange('course', e.target.value)}
                            fullWidth
                        />

                        <Typography fontWeight={600}>Estudiantes</Typography>
                        {team.students.map((student, idx) => (
                            <Box
                                key={idx}
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{
                                    bgcolor: '#f4f6f8',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                <Box display="flex" alignItems="center" gap={2}>
                                    <Avatar
                                        src="/caticon.svg"
                                        sx={{
                                            bgcolor: getColorByIndex(idx),
                                            width: 40,
                                            height: 40,
                                            p: 1.2,
                                        }}
                                    />
                                    <Box>
                                        <Typography>{student.fullName}</Typography>
                                        <Chip
                                            label={`Cod: ${student.studentCod}`}
                                            size="small"
                                            sx={{
                                                mt: 0.5,
                                                bgcolor: getColorByIndex(idx),
                                                color: 'white',
                                            }}
                                        />
                                    </Box>
                                </Box>
                                <IconButton onClick={() => confirmDeleteStudent(student)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}

                        <Typography fontWeight={600}>Agregar Estudiante</Typography>
                        <Stack direction="row" spacing={2}>
                            <TextField
                                label="Nombre completo"
                                value={newStudent.fullName}
                                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                                fullWidth
                            />
                            <TextField
                                label="Código"
                                value={newStudent.studentCod}
                                onChange={(e) => setNewStudent({ ...newStudent, studentCod: e.target.value })}
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
                    sx={{ width: '100%' , backgroundColor: '#5be031', color: 'white'}}
                >{message}</Alert>
            </Snackbar>
        </>
    )
}

export default TeamEditView
