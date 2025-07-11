
import { Box, IconButton, Tooltip } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import BlockIcon from '@mui/icons-material/Block';

const tooltipStyles = {
    sx: {
        bgcolor: '#1976D2',
        color: 'white',
        fontSize: '0.875rem',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
    }
}

function ActionButtons({ onEdit, onView, onDelete, item }) {
    return (
        <Box display={'flex'} gap={'4px'}>
            <Tooltip title="Editar"  componentsProps={{ tooltip: tooltipStyles }}>
                <IconButton size="small"
                    onClick={() => onEdit(item.id)} 
                    sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9c' } }}
                >
                    <EditIcon fontSize="small"/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Ver"  componentsProps={{ tooltip: tooltipStyles }}>
                <IconButton size="small"
                    onClick={() => onView(item.id)} 
                    sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9c' } }}
                >
                    <VisibilityIcon fontSize="small" />
                </IconButton>
            </Tooltip>
            <Tooltip title="Desactivar"  componentsProps={{ tooltip: tooltipStyles }} >
                <IconButton size="small"
                    onClick={() => onDelete(item)} 
                    sx={{ bgcolor: '#1976D2', color: 'white', '&:hover': { bgcolor: '#125a9c' } }}
                >
                    <BlockIcon  fontSize="small"/>
                </IconButton>
            </Tooltip>
        </Box>
    )
}

export default ActionButtons
