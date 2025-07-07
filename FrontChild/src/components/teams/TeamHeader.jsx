import { CardHeader, Box, Typography, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';

const TeamHeader = ({ onCreate }) => (
    <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
        title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <GroupIcon sx={{ fontSize: 32 }} />
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Gestión de Equipos</Typography>
                </Box>
                <IconButton color="inherit" onClick={onCreate}>
                    <Typography sx={{ fontSize: 18 }}>Crear Equipo</Typography>
                </IconButton>
            </Box>
        }
    />
);

export default TeamHeader;
