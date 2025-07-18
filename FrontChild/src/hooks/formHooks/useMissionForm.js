import { useState, useEffect } from 'react'
import { getMissionById, createMission, updateMission } from '@/services/api/missionServiceApi'
import { validateMissionFields } from '@/utils/validators/missionsValidator'

export function useMissionForm(missionId) {
    const [mission, setMission] = useState({
        title: '',
        description: '',
        objectives: [],
        startDate: null,
        endDate: null,
        materials: []
    })

    const [newObjective, setNewObjective] = useState('')
    const [errors, setErrors] = useState({})
    const [snackbarOpen, setSnackbarOpen] = useState(false)
    const [snackbarMessage, setSnackbarMessage] = useState('');


    useEffect(() => {
        if (missionId) {
            getMissionById(missionId)
                .then(setMission)
                .catch(err => console.error('Error al cargar misión:', err))
        }
    }, [missionId])

    const handleChange = (field, value) => {
        setMission(prev => ({ ...prev, [field]: value }))
        setErrors(prev => ({ ...prev, [field]: '' }))
    }

    const handleAddObjective = () => {
        if (!newObjective.trim()) return
        setMission(prev => ({
            ...prev,
            objectives: [...prev.objectives, newObjective.trim()]
        }))
        setNewObjective('')
    }

    const handleDeleteObjective = index => {
        setMission(prev => ({
            ...prev,
            objectives: prev.objectives.filter((_, i) => i !== index)
        }))
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0]
        if (!file) return

        const newMaterial = {
            fileName: file.name,
            url: URL.createObjectURL(file)
        }

        setMission(prev => ({
            ...prev,
            materials: [...prev.materials, newMaterial]
        }))
    }

    const handleDeleteMaterial = (index) => {
        setMission(prev => ({
            ...prev,
            materials: prev.materials.filter((_, i) => i !== index)
        }))
    }

    const handleSave = async () => {
        const { isValid, errors } = validateMissionFields(mission);
        setErrors(errors);
        if (!isValid) {
            setSnackbarMessage('Por favor, corrija los errores del formulario.');
            setSnackbarOpen(true);
            return;
        }
    
        try {
            if (missionId) {
                await updateMission(missionId, mission);
                setSnackbarMessage('¡Misión actualizada con éxito!');
            } else {
                await createMission(mission);
                setSnackbarMessage('¡Misión creada con éxito!');
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error al guardar misión:', error);
            setSnackbarMessage('Error al guardar la misión. Intente nuevamente.');
            setSnackbarOpen(true);
        }
    };
    

    return {
        mission,
        newObjective,
        errors,
        snackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        setSnackbarOpen,
        handleChange,
        handleAddObjective,
        setNewObjective,
        handleDeleteObjective,
        handleSave,
        handleFileUpload,
        handleDeleteMaterial
    }
}
