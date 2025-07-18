import { useEffect, useState } from 'react';
import { validateTeamFields, validateStudentInputs } from '@/utils/validators/teamsValidators';
import {
    getTeamById,
    createTeam,
    updateTeam
} from '@/services/api/teamServiceApi';

export const useTeamForm = (teamId) => {
    const [team, setTeam] = useState({ name: '', course: '', students: [] });
    const [teamErrors, setTeamErrors] = useState({ name: '', course: '', students: '' });
    const [newStudent, setNewStudent] = useState({ fullName: '', studentCod: '' });
    const [errors, setErrors] = useState({ fullName: '', studentCod: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [severity, setSeverity] = useState('success');

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {
        if (teamId) {
            getTeamById(teamId).then(data => setTeam(data)).catch(() => {
                setSnackbarMessage('Error al cargar el equipo');
                setSeverity('error');
                setSnackbarOpen(true);
            });
        }
    }, [teamId]);

    const handleChange = (field, value) => {
        setTeam({ ...team, [field]: value });
        setTeamErrors({ ...teamErrors, [field]: '' });
    };

    const handleAddStudent = () => {
        const { isValid, errors: studentErrors } = validateStudentInputs(newStudent, team.students);
        setErrors(studentErrors);

        if (!isValid) return;

        const newStudents = [...team.students, { ...newStudent }];
        setTeam(prev => ({ ...prev, students: newStudents }));
        setNewStudent({ fullName: '', studentCod: '' });
        setErrors({ fullName: '', studentCod: '' });
        setTeamErrors({ ...teamErrors, students: '' });
    };

    const confirmDeleteStudent = (student) => {
        setStudentToDelete(student);
        setConfirmOpen(true);
    };

    const handleDeleteStudent = () => {
        const updatedStudents = team.students.filter(s => s !== studentToDelete);
        setTeam({ ...team, students: updatedStudents });
        setConfirmOpen(false);
        setStudentToDelete(null);
    };

    const handleSave = async () => {
        const { isValid, errors } = validateTeamFields(team);
        setTeamErrors(errors);

        if (!isValid) return;

        try {
            if (teamId) {
                await updateTeam(teamId, team);
                setSnackbarMessage('¡Equipo actualizado con éxito!');
            } else {
                await createTeam(team);
                setSnackbarMessage('¡Equipo creado con éxito!');
            }
            setSeverity('success');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage('Error al guardar el equipo');
            setSeverity('error');
            setSnackbarOpen(true);
        }
    };

    return {
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
    };
};
