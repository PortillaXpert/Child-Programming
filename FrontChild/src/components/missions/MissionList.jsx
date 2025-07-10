import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Stack,
} from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Chip from '@mui/material/Chip';
import ActionButtons from '@/components/common/ActionButtons';

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6'];
const getColorByIndex = (index) => colors[index % colors.length];

function MissionList({ missions, onEdit, onView, onDelete }) {
    if (!missions || missions.length === 0) {
        return <Typography sx={{ mt: 2, textAlign: 'center' }}>No hay misiones disponibles.</Typography>;
    }

    return (
        <Stack spacing={2} sx={{ mt: 2 }}>
            {missions.map((mission, index) => (
                <Box
                    key={mission.id}
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
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: getColorByIndex(index) }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Box>
                            <Typography fontWeight={600}>{mission.title}</Typography>
                            <Chip
                                label={mission.active ? 'Activa' : 'Inactiva'}
                                size="small"
                                sx={{
                                mt: 0.5,
                                bgcolor: mission.active ? 'green' : 'gray',
                                color: 'white',
                                }}
                            />
                        </Box>
                    </Box>
                    <ActionButtons 
                        id={mission.id}
                        onEdit={onEdit}
                        onView={onView}
                        onDelete={onDelete}
                    />
                </Box>
            ))}
        </Stack>
    );
}

export default MissionList;
