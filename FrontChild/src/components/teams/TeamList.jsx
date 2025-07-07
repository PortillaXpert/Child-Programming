import { Stack, Typography } from '@mui/material';
import TeamCardItem from './TeamCardItem';

const TeamList = ({ teams, onEdit, onView, onDelete }) => {
    if (teams.length === 0) {
        return <Typography color="text.secondary">No se encontraron equipos.</Typography>;
    }

    return (
        <Stack spacing={2}>
            {teams.map((team, index) => (
                <TeamCardItem
                    key={team.id}
                    team={team}
                    index={index}
                    onEdit={onEdit}
                    onView={onView}
                    onDelete={onDelete}
                />
            ))}
        </Stack>
    );
};

export default TeamList;
