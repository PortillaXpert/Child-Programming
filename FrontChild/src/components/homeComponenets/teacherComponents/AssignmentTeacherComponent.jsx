import { useEffect, useState } from "react";
import { getAllAssignments } from "@/services/api/assignmentServiceApi";
import CardContainer from "@/components/common/CardContainer";
import SectionHeader from "@/components/common/SectionHeader";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchInput from "@/components/common/ui/SearchInput";
import SkeletonCard from "@/components/others/skeletonCard";
import EntityList from "@/components/common/EntityList";
import EntityCardItem from "@/components/common/ui/EntityCardItem";
import AssignmentDetailsView from '@/components/assignment/AssignmentDetailsView';
import ConfirmDialog from "@/components/others/dialog/ConfirmDialog";   
import { deleteAssignment } from "@/services/api/assignmentServiceApi"; 
import { getStatusColor, getStatusLabel} from "@/utils/const";


function AssignmentTeacherComponent() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [assignmentToDelete, setAssignmentToDelete] = useState(null);

    const fetchAssignments = async () => {
        setLoading(true);
        try {
            const data = await getAllAssignments(); 
            setAssignments(data);
        } catch (err) {
            console.error("Error al cargar asignaciones:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignments();
    }, []);

    const filteredAssignments = assignments.filter((assignment) =>
        assignment.titleMission.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <SkeletonCard titleLines={1} items={3} />;
    }

    if (selectedAssignmentId) {
        return (
            <AssignmentDetailsView
                assignmentId={selectedAssignmentId}
                onBack={() => {
                    setSelectedAssignmentId(null);
                    fetchAssignments();
                }}
            />
        );
    }

    const handleDeleteAssignment = async () => {
        try {
            await deleteAssignment(assignmentToDelete.id);
            setAssignments(await getAllAssignments());
            setConfirmDeleteOpen(false);
            setAssignmentToDelete(null);
        } catch (error) {
            console.error("Error al eliminar la asignación:", error);
            alert("Ocurrió un error al eliminar la asignación.");
        }
    }

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
                    />
                }
                list={
                    <EntityList items={filteredAssignments} renderItem={(assignment, index) =>
                        <EntityCardItem
                            item={assignment}
                            index={index}
                            icon={<AssignmentIcon />}
                            title={assignment.titleMission}
                            subtitle={`Equipo: ${assignment.teamName} • Curso: ${assignment.teamCourse}`}
                            chipLabel={getStatusLabel(assignment.status)}
                            chipColor={getStatusColor(assignment.status)}
                            onView={(id) => setSelectedAssignmentId(id)}
                            onDelete={(assignment) => {
                                setAssignmentToDelete(assignment);
                                setConfirmDeleteOpen(true);
                            }}
                        />
                    }>
                    </EntityList>
                }
            />

            <ConfirmDialog
            open={confirmDeleteOpen}
            onClose={() => setConfirmDeleteOpen(false)}
            onConfirm={handleDeleteAssignment}
            title="¿Desactivar Asignación?"
            content={`¿Estás seguro de que deseas desactivar esta asignación?`}
            />
        </>
    );
}

export default AssignmentTeacherComponent;
