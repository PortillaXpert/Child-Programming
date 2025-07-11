import { useEffect, useState } from 'react';
import { getAllTeams, deleteTeam } from '@/services/api/teamServiceApi';
import SkeletonCard from '@/components/others/skeletonCard';
import TeamDetailDialog from '@/components/teams/TeamDetailDialog';
import TeamCreateEditView from '@/components/teams/TeamCreateEditView';
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog';
import CardContainer from '@/components/common/CardContainer';
import SectionHeader from '@/components/common/SectionHeader';
import SearchInput from '@/components/common/ui/SearchInput';
import EntityList from '@/components/common/EntityList';
import EntityCardItem from '@/components/common/ui/EntityCardItem';

function TeamTeacherComponent() {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [editingTeamId, setEditingTeamId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState(null);

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const data = await getAllTeams();
            setTeams(data);
        } catch (err) {
            console.error('Error al cargar equipos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading || !teams) {
        return <SkeletonCard titleLines={1} items={3} />;
    }

    if (editingTeamId || isCreating) {
        return (
            <TeamCreateEditView
                teamId={editingTeamId}
                onBack={() => {
                    setEditingTeamId(null);
                    setIsCreating(false);
                    fetchTeams();
                }}
            />
        );
    }

    const handleDeleteTeam = async () => {
        try {
            await deleteTeam(teamToDelete.id);
            setTeams((prev) => prev.filter((team) => team.id !== teamToDelete.id));
            setConfirmDeleteOpen(false);
            setTeamToDelete(null);
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
            alert('Ocurrió un error al eliminar el equipo.');
        }
    };

    return (
        <>
            <CardContainer
                header={
                    <SectionHeader
                        title="Gestión de Equipos"
                        icon="./iconteam.svg"
                        onCreate={() => setIsCreating(true)}
                        tooltipText="Crear equipo"
                    />
                }
                search={
                    <SearchInput
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Buscar equipo"
                    />
                }
                list={
                    <EntityList
                        items={filteredTeams}
                        renderItem={(team, index) => (
                            <EntityCardItem
                                item={team}
                                index={index}
                                icon={<img src="/caticon.svg" alt="Ícono gato" style={{ width: 24 }} />}
                                title={team.name}
                                subtitle={`Curso: ${team.course} • ${team.students.length} estudiantes`}
                                onEdit={(id) => setEditingTeamId(id)}
                                onView={(id) => {
                                    setSelectedTeamId(id);
                                    setOpenDialog(true);
                                }}
                                onDelete={(team) => {
                                    setTeamToDelete(team);
                                    setConfirmDeleteOpen(true);
                                }}
                            />
                        )}
                    />
                }
            />


            <TeamDetailDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                teamId={selectedTeamId}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteTeam}
                title="¿Eliminar equipo?"
                content={`¿Estás seguro de que deseas desactivar este equipo?`}
            />
        </>
    );
}

export default TeamTeacherComponent;
