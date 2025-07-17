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
import AddIcon from '@mui/icons-material/Add'
import { useState, useEffect } from 'react'
import { getMissionById, createMission, updateMission } from '@/services/api/missionServiceApi'
import CustomDataTimePicker from '@/components/common/ui/CustomDataTimePicker'
import DeleteIcon from '@mui/icons-material/Delete'
import { validateMissionFields } from '@/utils/validators/missionsValidator';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import FormHeader from '@/components/common/FormHeader'
import CustomSnackBar from '@/components/common/ui/CustomSnackBar'
import dayjs from 'dayjs'

function MissionCreateEditView({ missionId, onBack }) {
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

    const handleSave = async () => {
        const { isValid, errors } = validateMissionFields(mission);
        setErrors(errors);
        if (!isValid) return;
    
        try {
            if (missionId) {
                await updateMission(missionId, mission);
            } else {
                await createMission(mission);
            }
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Error al guardar misión:', error);
        }
    };

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
    
    return (
        <>
            <Card sx={{ width: '50vw', height: '80vh', overflowY: 'auto',
                overflowX: 'hidden',
                scrollbarColor: '#1976D2 white',
                scrollbarWidth: 'thin',  }}>
                <FormHeader title= {missionId ? 'Editar Misión' : 'Crear Misión'} onBack={onBack}></FormHeader>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Título"
                            value={mission.title}
                            onChange={e => handleChange('title', e.target.value)}
                            error={!!errors.title}
                            helperText={errors.title}
                            fullWidth
                        />
                        <TextField
                            label="Descripción"
                            multiline
                            minRows={3}
                            value={mission.description}
                            onChange={e => handleChange('description', e.target.value)}
                            error={!!errors.description}
                            helperText={errors.description}
                            fullWidth
                        />
                        <CustomDataTimePicker 
                            label="Fecha de inicio"
                            value={mission.startDate ? dayjs(mission.startDate) : null}
                            onChange={date => handleChange('startDate', date ? date.format('YYYY-MM-DDTHH:mm:ss') : null)}
                            slotProps={{ textField: { fullWidth: true, error: !!errors.startDate, helperText: errors.startDate } }}
                        />
                        <CustomDataTimePicker 
                            label="Fecha de finalización (opcional)"
                            value={mission.endDate ? dayjs(mission.endDate) : null}
                            onChange={date => handleChange('endDate', date ? date.format('YYYY-MM-DDTHH:mm:ss') : null)}
                            slotProps={{ textField: { fullWidth: true } }}
                        />

                        <Typography fontWeight={600}>Objetivos</Typography>
                        {mission.objectives.map((obj, idx) => (
                            <Box key={idx} display="flex" alignItems="center" gap={1}>
                                <TextField value={obj} fullWidth disabled />
                                <IconButton onClick={() => handleDeleteObjective(idx)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}
                        {errors.objectives && (
                            <Typography color="error" variant="body2">{errors.objectives}</Typography>
                        )}
                        <Box display="flex" gap={2}>
                            <TextField
                                label="Nuevo objetivo"
                                value={newObjective}
                                onChange={e => setNewObjective(e.target.value)}
                                fullWidth
                            />
                            <IconButton onClick={handleAddObjective} sx={{ alignSelf: 'center' }}>
                                <AddIcon />
                            </IconButton>
                        </Box>

                        <Typography fontWeight={600}>Materiales</Typography>
                        {mission.materials.map((material, index) => (
                            <Box key={index} display="flex" alignItems="center" gap={2}>
                                <TextField value={material.fileName} disabled fullWidth />
                                <IconButton onClick={() => handleDeleteMaterial(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        ))}

                        <Button variant="outlined" component="label" 
                            endIcon={<ArrowCircleUpIcon sx={{ color: '#1976D2' , marginLeft: '2px'}}></ArrowCircleUpIcon>}>
                            Subir archivo
                            <input type="file" hidden onChange={handleFileUpload} />
                        </Button>

                        <Box display="flex" justifyContent="center" mt={2}>
                            <Button onClick={handleSave} variant="contained" sx={{ bgcolor: '#1976D2' }}>
                                Guardar Cambios
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card>
            
            <CustomSnackBar
                message={missionId ? '¡Misión actualizada con éxito!' : '¡Misión creada con éxito!'}
                snackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                severity="success"
            />
        </>
    )
}

export default MissionCreateEditView
