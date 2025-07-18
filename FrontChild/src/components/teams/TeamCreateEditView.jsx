import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog';
import StudentItem from '@/components/teams/StudentItem';
import FormHeader from '@/components/common/FormHeader';
import CustomSnackBar from '@/components/common/ui/CustomSnackBar';
import { useTeamForm } from '@/hooks/formHooks/useTeamForm';

function TeamCreateEditView({ teamId, onBack }) {
    const {
        team,
        teamErrors,
        newStudent,
        errors,
        snackbarOpen,
        snackbarMessage,
        severity,
        setSnackbarOpen,
        handleChange,
        handleAddStudent,
        confirmDeleteStudent,
        confirmOpen,
        setConfirmOpen,
        studentToDelete,
        handleDeleteStudent,
        setNewStudent,
        handleSave
    } = useTeamForm(teamId);

    return (
        <>
            <Card sx={{ width: '50vw', height: '70vh', overflowY: 'auto', overflowX: 'hidden', scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
                <FormHeader title={teamId ? 'Editar Equipo' : 'Crear Equipo'} onBack={onBack} />
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
                message={snackbarMessage}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity={severity}
            />
        </>
    );
}

export default TeamCreateEditView;
