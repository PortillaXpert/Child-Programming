import { Box, Typography, Avatar} from '@mui/material';
import ActionButtons from '@/components/common/ActionButtons';

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6'];
const getColorByIndex = (index) => colors[index % colors.length];

const TeamCardItem = ({ team, index, onEdit, onView, onDelete }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                bgcolor: '#ffffff',
                borderRadius: 2,
                px: 2,
                py: 1,
                boxShadow: 1,
                transition: 'transform 0.2s',
                '&:hover': {
                    transform: 'scale(1.01)',
                    boxShadow: 3,
                },
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar
                    src="/caticon.svg"
                    alt="Ícono gato"
                    sx={{ bgcolor: getColorByIndex(index), width: 40, height: 40, p: 1.2 }}
                />
                <Box>
                    <Typography sx={{ fontWeight: 600 }}>{team.name}</Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        Curso: {team.course} • {team.students.length} estudiantes
                    </Typography>
                </Box>
            </Box>
            <ActionButtons id={team.id} onEdit={onEdit} onView={onView} onDelete={onDelete}/>
        </Box>
    );
};

export default TeamCardItem;