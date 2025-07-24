import { getAllAssignments, deleteAssignment } from "@/services/api/assignmentServiceApi"

import CardContainer from "@/components/common/CardContainer"
import SectionHeader from "@/components/common/SectionHeader"
import AssignmentIcon from '@mui/icons-material/Assignment'
import SearchInput from "@/components/common/ui/SearchInput"
import SkeletonCard from "@/components/others/skeletonCard"
import EntityList from "@/components/common/EntityList"
import EntityCardItem from "@/components/common/ui/EntityCardItem"
import AssignmentDetailsView from '@/components/assignment/AssignmentDetailsView'
import ConfirmDialog from "@/components/others/dialog/ConfirmDialog"
import AssignmentCreateEditView from '@/components/assignment/AssignmentCreateEditView'

import { getStatusColor, getStatusLabel } from "@/utils/const"
import { useCrudStates } from "@/hooks/dataHooks/useCrudStates"
import { useDeleteHandler } from "@/hooks/dataHooks/useDeleteHandler"
import { useFetchPaginatedData } from "@/hooks/dataHooks/useFecthPaginatedData"
import CustomPagination from "@/components/common/ui/CustomPagination"
import { useSearchFilter } from "@/hooks/dataHooks/useSearchFilter"

function AssignmentTeacherComponent() {
    const {
        editingId,
        setEditingId,
        isCreating,
        setIsCreating,
        selectedId,
        setSelectedId,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        itemToDelete,
        setItemToDelete,
    } = useCrudStates()

    const {
        data: assignments,
        setData: setAssignments,
        loading,
        page,
        setPage,
        totalPages,
        fetchData,
    } = useFetchPaginatedData(getAllAssignments, 0, 4)

    const {
        search,
        setSearch,
        filtered: filteredAssignments
    } = useSearchFilter(assignments, ["titleMission","status"])

    const { handleDelete } = useDeleteHandler(deleteAssignment, setAssignments)

    const confirmDelete = async () => {
        await handleDelete(itemToDelete.id)
        setConfirmDeleteOpen(false)
        setItemToDelete(null)
    }

    if (loading) return <SkeletonCard titleLines={1} items={3} />

    if (selectedId) {
        return (
            <AssignmentDetailsView
                assignmentId={selectedId}
                onBack={() => {
                    setSelectedId(null)
                    fetchData()
                }}
            />
        )
    }

    if (isCreating || editingId) {
        return (
            <AssignmentCreateEditView
                assignmentId={editingId}
                onBack={() => {
                    setEditingId(null)
                    setIsCreating(false)
                    fetchData()
                }}
            />
        )
    }

    const action = itemToDelete?.status != 'DESACTIVATE' ? 'Desactivar' : 'Activar';


    return (
        <>
            <CardContainer
                header={
                    <SectionHeader
                        title="Gestión de Asignaciones"
                        icon={<AssignmentIcon sx={{ color: 'white', fontSize: 30 }} />}
                        onCreate={() => setIsCreating(true)}
                        tooltipText="Crear asignación"
                    />
                }
                search={
                    <SearchInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Buscar asignación"
                        placeholder="Título o estado de la asignación"
                    />
                }
                list={
                    <>
                        <EntityList
                            items={filteredAssignments}
                            renderItem={(assignment, index) => (
                                <EntityCardItem
                                    item={assignment}
                                    index={index}
                                    icon={<AssignmentIcon />}
                                    title={assignment.titleMission}
                                    subtitle={`Equipo: ${assignment.teamName} • Curso: ${assignment.teamCourse}`}
                                    chipLabel={getStatusLabel(assignment.status)}
                                    chipColor={getStatusColor(assignment.status)}
                                    onView={(id) => setSelectedId(id)}
                                    onDelete={(assignment) => {
                                        setItemToDelete(assignment)
                                        setConfirmDeleteOpen(true)
                                    }}
                                    onEdit={(id) => setEditingId(id)}
                                />
                            )}
                        />
                    <CustomPagination totalPages={totalPages} page={page} setPage={setPage}></CustomPagination>
                    </>
                }
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={confirmDelete}
                title={`¿${action} asignación?`}
                content={`¿Estás seguro de que deseas ${action.toLowerCase()} esta asignación?`}
            />
        </>
    )
}

export default AssignmentTeacherComponent
