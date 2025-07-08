import { useEffect, useState } from 'react'
import { getMissions, deleteMission } from '@/services/api/missionServiceApi'
import SkeletonCard from '@/components/common/skeletonCard'
import ConfirmDialog from '@/components/others/ConfirmDialog'
import SearchInput from '@/components/common/SearchInput'
import CardContainer from '@/components/common/CardContainer'
import MissionHeader from '@/components/missions/MissionHeader'
import MissionList from '@/components/missions/MissionList'
import MissionDetailDialog from '@/components/missions/MissionDetailDialog'

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
        // falta crear / editar misión
        return null
    }

    const handleDeleteMission = async () => {
        try {
            await deleteMission(missionToDelete.id)
            setMissions((prev) => prev.filter((m) => m.id !== missionToDelete.id))
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
                header={<MissionHeader onCreate={() => setIsCreating(true)} />}
                search={<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />}
                list={
                    <MissionList
                        missions={filteredMissions}
                        onEdit={(id) => setEditingMissionId(id)}
                        onView={(id) => {
                            setSelectedMissionId(id)
                            setOpenDialog(true)
                        }}
                        onDelete={(mission) => {
                            setMissionToDelete(mission)
                            setConfirmDeleteOpen(true)
                        }}
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
                title="¿Eliminar misión?"
                content={`¿Estás seguro de que deseas eliminar la misión "${missionToDelete?.title}"?`}
            />
        </>
    )
}

export default MissionTeacherComponent
