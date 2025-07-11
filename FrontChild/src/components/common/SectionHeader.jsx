import { CardHeader, Box, Typography, IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import GroupIcon from '@mui/icons-material/Group';

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

const SectionHeader = ({ title, icon, onCreate, tooltipText }) => (
    <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
        title={
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {typeof icon === 'string' ? (
                        <img src={icon} alt="Ícono" style={{ width: 32, height: 32 }} />
                    ) : (
                        icon
                    )}
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }}>{title}</Typography>
                </Box>
                <Tooltip title={tooltipText} componentsProps={{ tooltip: tooltipStyles }} placement="left">
                    <IconButton color="inherit" onClick={onCreate}>
                        <AddCircleOutlineIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </Box>
        }
    />
);

export default SectionHeader;
