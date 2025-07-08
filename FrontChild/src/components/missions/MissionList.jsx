import {
    Box,
    Typography,
    IconButton,
    Avatar,
    Chip,
    Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AssignmentIcon from '@mui/icons-material/Assignment';

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
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                        bgcolor: '#f4f6f8',
                        borderRadius: 2,
                        px: 2,
                        py: 1,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar sx={{ bgcolor: getColorByIndex(index) }}>
                            <AssignmentIcon />
                        </Avatar>
                        <Box>
                            <Typography fontWeight={600}>{mission.title}</Typography>
                        </Box>
                    </Box>

                    <Box>
                        <IconButton onClick={() => onEdit(mission.id)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => onView(mission.id)}>
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => onDelete(mission)}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}

export default MissionList;
