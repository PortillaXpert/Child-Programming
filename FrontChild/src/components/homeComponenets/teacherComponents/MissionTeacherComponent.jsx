import { useEffect, useState } from 'react'
import { getMissions, deleteMission } from '@/services/api/missionServiceApi'
import SkeletonCard from '@/components/others/skeletonCard'
import EntityList from '@/components/common/EntityList';
import EntityCardItem from '@/components/common/ui/EntityCardItem';
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog'
import SearchInput from '@/components/common/ui/SearchInput'
import CardContainer from '@/components/common/CardContainer'
import SectionHeader from '@/components/common/SectionHeader'
import MissionDetailDialog from '@/components/missions/MissionDetailDialog'
import MissionCreateEditView from '@/components/missions/MissionCreateEditView'
import StarIcon from '@/components/icon/StarIcon';

function MissionTeacherComponent() {
    const [missions, setMissions] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [selectedMissionId, setSelectedMissionId] = useState(null)
    const [editingMissionId, setEditingMissionId] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false)
    const [missionToDelete, setMissionToDelete] = useState(null)

    const fetchMissions = async () => {
        setLoading(true)
        try {
            const data = await getMissions()
            setMissions(data)
        } catch (err) {
            console.error('Error al cargar misiones:', err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMissions()
    }, [])

    const filteredMissions = missions.filter((mission) =>
        mission.title.toLowerCase().includes(search.toLowerCase())
    )

    if (loading || !missions) {
        return <SkeletonCard titleLines={1} items={3} />
    }

    if (editingMissionId || isCreating) {
        return (
            <MissionCreateEditView
                missionId={editingMissionId}
                onBack={() => {
                    setEditingMissionId(null)
                    setIsCreating(false)
                    fetchMissions()
                }}
            />
        )
    }

    const handleDeleteMission = async () => {
        try {
            await deleteMission(missionToDelete.id)
            setMissions((prev) =>
                prev.map((m) =>
                    m.id === missionToDelete.id ? { ...m, active: false } : m
                )
            )
            setConfirmDeleteOpen(false)
            setMissionToDelete(null)
        } catch (error) {
            console.error('Error al eliminar misión:', error)
            alert('Ocurrió un error al eliminar la misión.')
        }
    }

    return (
        <>
            <CardContainer
                header={
                    <SectionHeader
                        title="Gestión de Misiones"
                        icon="./star.svg"
                        onCreate={() => setIsCreating(true)}
                        tooltipText="Crear misión"
                    />
                }
                search={
                    <SearchInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Buscar misión"
                    />
                }
                list={
                    <EntityList
                        items={filteredMissions}
                        renderItem={(mission, index) => (
                            <EntityCardItem
                                item={mission}
                                index={index}
                                icon={<StarIcon color = 'white' />}
                                title={mission.title}
                                chipLabel={mission.active ? 'Activa' : 'Inactiva'}
                                chipColor={mission.active ? 'green' : 'gray'}
                                onEdit={(id) => setEditingMissionId(id)}
                                onView={(id) => {
                                    setSelectedMissionId(id);
                                    setOpenDialog(true);
                                }}
                                onDelete={(mission) => {
                                    setMissionToDelete(mission);
                                    setConfirmDeleteOpen(true);
                                }}
                            />
                        )}
                    />
                }
            />


            <MissionDetailDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                missionId={selectedMissionId}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteMission}
                title="¿Desactivar misión?"
                content={`¿Estás seguro de que deseas desactivar esta misión?`}
            />
        </>
    )
}

export default MissionTeacherComponent
