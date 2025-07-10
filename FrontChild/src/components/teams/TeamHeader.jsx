import { CardHeader, Box, Typography, IconButton } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Tooltip from '@mui/material/Tooltip';

const tooltipStyles = {
    sx: {
        bgcolor: 'white',
        color: '#1976D2',
        fontSize: '0.875rem',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
    }
};

const TeamHeader = ({ onCreate }) => (
    <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
        title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <GroupIcon sx={{ fontSize: 32 }} />
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Gestión de Equipos</Typography>
                </Box>
                <Tooltip title="Crear equipo"  componentsProps={{ tooltip: tooltipStyles }} placement="left"    >
                    <IconButton color="inherit" onClick={onCreate}>
                        <AddCircleOutlineIcon fontSize='large'></AddCircleOutlineIcon>
                        <Typography sx={{ fontSize: 18 }}></Typography>
                    </IconButton>
                </Tooltip>
            </Box>
        }
    />
);

export default TeamHeader;
