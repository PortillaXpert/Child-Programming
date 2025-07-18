import { getMissions, deleteMission } from '@/services/api/missionServiceApi'
import { useFetchData } from '@/hooks/dataHooks/useFetchData'
import { useSearchFilter } from '@/hooks/dataHooks/useSearchFilter'
import { useCrudStates } from '@/hooks/dataHooks/useCrudStates'
import SkeletonCard from '@/components/others/skeletonCard'
import EntityList from '@/components/common/EntityList'
import EntityCardItem from '@/components/common/ui/EntityCardItem'
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog'
import SearchInput from '@/components/common/ui/SearchInput'
import CardContainer from '@/components/common/CardContainer'
import SectionHeader from '@/components/common/SectionHeader'
import MissionDetailDialog from '@/components/missions/MissionDetailDialog'
import MissionCreateEditView from '@/components/missions/MissionCreateEditView'
import StarIcon from '@/components/icon/StarIcon'

function MissionTeacherComponent() {
    const { data: missions, setData: setMissions, loading, fetchData } = useFetchData(getMissions)
    const { search, setSearch, filtered: filteredMissions } = useSearchFilter(missions, 'title')
    const {
        editingId: editingMissionId,
        setEditingId: setEditingMissionId,
        isCreating,
        setIsCreating,
        selectedId: selectedMissionId,
        setSelectedId: setSelectedMissionId,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        itemToDelete: missionToDelete,
        setItemToDelete: setMissionToDelete,
    } = useCrudStates()

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

    if (loading || !missions) return <SkeletonCard titleLines={1} items={3} />

    if (editingMissionId || isCreating) {
        return (
            <MissionCreateEditView
                missionId={editingMissionId}
                onBack={() => {
                    setEditingMissionId(null)
                    setIsCreating(false)
                    fetchData()
                }}
            />
        )
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
                                icon={<StarIcon color="white" />}
                                title={mission.title}
                                chipLabel={mission.active ? 'Activa' : 'Inactiva'}
                                chipColor={mission.active ? 'green' : 'gray'}
                                onEdit={(id) => setEditingMissionId(id)}
                                onView={(id) => {
                                    setSelectedMissionId(id)
                                }}
                                onDelete={(mission) => {
                                    setMissionToDelete(mission)
                                    setConfirmDeleteOpen(true)
                                }}
                            />
                        )}
                    />
                }
            />

            <MissionDetailDialog
                open={selectedMissionId !== null}
                onClose={() => setSelectedMissionId(null)}
                missionId={selectedMissionId}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteMission}
                title="¿Desactivar misión?"
                content="¿Estás seguro de que deseas desactivar esta misión?"
            />
        </>
    )
}

export default MissionTeacherComponent
