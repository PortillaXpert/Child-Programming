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

const statusColors = {
    PENDING: '#FFA726',       
    IN_PROGRESS: '#29B6F6',  
    COMPLETED: '#66BB6A',     
    REVIEWED: '#AB47BC',      
};

const statusLabels = {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'En Progreso',
    COMPLETED: 'Completada',
    REVIEWED: 'Revisada',
};

const getStatusColor = (status) => statusColors[status] || '#BDBDBD'; 

function AssignmentTeacherComponent() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

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

    return (
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
                        chipLabel={statusLabels[assignment.status] || 'Desconocido'}
                        chipColor={getStatusColor(assignment.status)}
                        onView={(id) => setSelectedAssignmentId(id)}
                    />
                }>
                </EntityList>
            }
        />
    );
}

export default AssignmentTeacherComponent;
