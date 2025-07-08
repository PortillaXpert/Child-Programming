import { useEffect, useState } from 'react';
import { getAllTeams, deleteTeam } from '@/services/api/teamServiceApi';
import SkeletonCard from '@/components/common/skeletonCard';
import TeamDetailDialog from '@/components/teams/TeamDetailDialog';
import TeamCreateEditView from '@/components/teams/TeamCreateEditView';
import ConfirmDialog from '@/components/others/ConfirmDialog';
import CardContainer from '@/components/common/CardContainer';
import TeamHeader from '@/components/teams/TeamHeader';
import SearchInput from '@/components/common/SearchInput';
import TeamList from '@/components/teams/TeamList';

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
                header={<TeamHeader onCreate={() => setIsCreating(true)} />}
                search={<SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />}
                list={
                    <TeamList
                        teams={filteredTeams}
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
                content={`¿Estás seguro de que deseas eliminar el equipo "${teamToDelete?.name}"?`}
            />
        </>
    );
}

export default TeamTeacherComponent;
