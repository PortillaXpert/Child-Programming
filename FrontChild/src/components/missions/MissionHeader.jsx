import { CardHeader, Box, Typography, IconButton } from '@mui/material';

const MissionHeader = ({ onCreate }) => (
    <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
        title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={'./star.svg'} alt="Ícono" style={{ width: 32, height: 32 , color:'white' }} />
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Gestión de Misiones</Typography>
                </Box>
                <IconButton color="inherit" onClick={onCreate}>
                    <Typography sx={{ fontSize: 18 }}>Crear Mision</Typography>
                </IconButton>
            </Box>
        }
    />
);

export default MissionHeader;
