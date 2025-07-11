import { useEffect, useState } from "react";
import { getAllAssignments } from "@/services/api/assignmentServiceApi";
import CardContainer from "@/components/common/CardContainer";
import SectionHeader from "@/components/common/SectionHeader";
import AssignmentIcon from '@mui/icons-material/Assignment';
import SearchInput from "@/components/common/SearchInput";
import SkeletonCard from "@/components/common/skeletonCard";
import EntityList from "@/components/common/EntityList";
import EntityCardItem from "@/components/common/EntityCardItem";

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
                <EntityList
                    items={filteredAssignments}
                    renderItem={(assignment, index) => (
                        <EntityCardItem
                            item={assignment}
                            index={index}
                            icon={<AssignmentIcon />}
                            title={assignment.titleMission}
                            subtitle={`Equipo: ${assignment.teamName} • Curso: ${assignment.teamCourse}`}
                            chipLabel={statusLabels[assignment.status] || 'Desconocido'}
                            chipColor={getStatusColor(assignment.status)}
                        />
                    )}
                />
            }
        />
    );
}

export default AssignmentTeacherComponent;
