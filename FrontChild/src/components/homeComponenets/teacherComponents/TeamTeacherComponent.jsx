import { getAllTeams, deleteTeam } from '@/services/api/teamServiceApi';
import { useSearchFilter } from '@/hooks/dataHooks/useSearchFilter';
import { useCrudStates } from '@/hooks/dataHooks/useCrudStates';
import SkeletonCard from '@/components/others/skeletonCard';
import TeamDetailDialog from '@/components/teams/TeamDetailDialog';
import TeamCreateEditView from '@/components/teams/TeamCreateEditView';
import ConfirmDialog from '@/components/others/dialog/ConfirmDialog';
import CardContainer from '@/components/common/CardContainer';
import SectionHeader from '@/components/common/SectionHeader';
import SearchInput from '@/components/common/ui/SearchInput';
import EntityList from '@/components/common/EntityList';
import EntityCardItem from '@/components/common/ui/EntityCardItem';
import CustomPagination from '@/components/common/ui/CustomPagination';
import { useFetchPaginatedData } from '@/hooks/dataHooks/useFecthPaginatedData';

function TeamTeacherComponent() {
    const {
        data: teams,
        setData: setTeams,
        loading,
        page,
        setPage,
        totalPages,
        fetchData,
    } = useFetchPaginatedData(getAllTeams, 0, 4)
    
    const { search, setSearch, filtered: filteredTeams } = useSearchFilter(teams, 'name');
    const {
        editingId: editingTeamId,
        setEditingId: setEditingTeamId,
        isCreating,
        setIsCreating,
        selectedId: selectedTeamId,
        setSelectedId: setSelectedTeamId,
        confirmDeleteOpen,
        setConfirmDeleteOpen,
        itemToDelete: teamToDelete,
        setItemToDelete: setTeamToDelete,
    } = useCrudStates();

    const handleDeleteTeam = async () => {
        try {
            await deleteTeam(teamToDelete.id);
            setTeams(await getAllTeams());
            setConfirmDeleteOpen(false);
            setTeamToDelete(null);
        } catch (error) {
            console.error('Error al eliminar el equipo:', error);
            alert('Ocurrió un error al eliminar el equipo.');
        }
    };

    if (loading || !teams) return <SkeletonCard titleLines={1} items={3} />;

    if (editingTeamId || isCreating) {
        return (
            <TeamCreateEditView
                teamId={editingTeamId}
                onBack={() => {
                    setEditingTeamId(null);
                    setIsCreating(false);
                    fetchData();
                }}
            />
        );
    }

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
                    <>
                        <EntityList
                            items={filteredTeams}
                            renderItem={(team, index) => (
                                <EntityCardItem
                                    item={team}
                                    index={index}
                                    icon={<img src="/caticon.svg" alt="Ícono gato" style={{ width: 24 }} />}
                                    title={team.name}
                                    chipLabel={team.active ? 'Activo' : 'Inactivo'}
                                    chipColor={team.active ? 'green' : 'gray'}
                                    subtitle={`Curso: ${team.course} • ${team.students.length} estudiantes`}
                                    onEdit={(id) => setEditingTeamId(id)}
                                    onView={(id) => {
                                        setSelectedTeamId(id);
                                    }}
                                    onDelete={(team) => {
                                        setTeamToDelete(team);
                                        setConfirmDeleteOpen(true);
                                    }}
                                />
                            )}
                        />
                        <CustomPagination totalPages={totalPages} page={page} setPage={setPage}></CustomPagination>
                    </>
                }
            />

            <TeamDetailDialog
                open={selectedTeamId !== null}
                onClose={() => setSelectedTeamId(null)}
                teamId={selectedTeamId}
            />

            <ConfirmDialog
                open={confirmDeleteOpen}
                onClose={() => setConfirmDeleteOpen(false)}
                onConfirm={handleDeleteTeam}
                title="¿Desactivar equipo?"
                content="¿Estás seguro de que deseas desactivar este equipo?"
            />
        </>
    );
}

export default TeamTeacherComponent;
