// components/missions/MissionDetailDialog.jsx
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Typography,
    Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getMissionById } from '@/services/api/missionServiceApi'
import ObjectivesSection from './ObjectivesSection'
import MaterialsSection from './MaterialsSection'
import TimeSection from './TimeSection'
import SkeletonCard from '@/components/common/skeletonCard'

const MissionDetailDialog = ({ open, onClose, missionId }) => {
    const [mission, setMission] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMission = async () => {
            if (!missionId) return
            setLoading(true)
            try {
                const data = await getMissionById(missionId)
                setMission(data)
            } catch (err) {
                console.error('Error al obtener misión:', err)
            } finally {
                setLoading(false)
            }
        }

        if (open) fetchMission()
    }, [open, missionId])

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth sx={{overflow: 'auto', 
            scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin'}}>
            <DialogTitle sx={{ bgcolor: '#1976D2', color: 'white' }}>
                Detalles de la Misión
            </DialogTitle>
            <DialogContent dividers sx={{ maxHeight: '70vh' }}>
                {loading ? (
                    <SkeletonCard titleLines={1} items={0} />
                ) : (
                    <>
                        <Typography variant="h6" gutterBottom>
                            {mission.title}
                        </Typography>
                        <Typography>{mission.description}</Typography>

                        <Divider sx={{ my: 2 }} />

                        <ObjectivesSection objectives={mission.objectives} />
                        <Divider sx={{ my: 2 }} />

                        <MaterialsSection materials={mission.materials} />
                        <Divider sx={{ my: 2 }} />

                        <TimeSection startDate={mission.startDate} endDate={mission.endDate} />
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default MissionDetailDialog
