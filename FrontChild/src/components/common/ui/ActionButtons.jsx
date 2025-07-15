import { Box, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import { CheckCircle } from '@mui/icons-material';

const tooltipStyles = {
    sx: {
        bgcolor: '#1976D2',
        color: 'white',
        fontSize: '0.875rem',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
    },
};

function ActionButtons({ onEdit, onView, onDelete, item, chipColor }) {
    const isActive = chipColor === 'green';
    const toggleTooltip = isActive ? 'Desactivar' : 'Activar';
    const ToggleIcon = isActive ? BlockIcon : CheckCircle;

    return (
        <Box display="flex" gap="4px">
            {onEdit && (
                <Tooltip title="Editar" componentsProps={{ tooltip: tooltipStyles }}>
                    <IconButton
                        size="small"
                        onClick={() => onEdit(item.id)}
                        sx={{
                            bgcolor: '#1976D2',
                            color: 'white',
                            '&:hover': { bgcolor: '#125a9c' },
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {onView && (
                <Tooltip title="Ver" componentsProps={{ tooltip: tooltipStyles }}>
                    <IconButton
                        size="small"
                        onClick={() => onView(item.id)}
                        sx={{
                            bgcolor: '#1976D2',
                            color: 'white',
                            '&:hover': { bgcolor: '#125a9c' },
                        }}
                    >
                        <VisibilityIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}

            {onDelete && (
                <Tooltip title={toggleTooltip} componentsProps={{ tooltip: tooltipStyles }}>
                    <IconButton
                        size="small"
                        onClick={() => onDelete(item)}
                        sx={{
                            bgcolor: '#1976D2',
                            color: 'white',
                            '&:hover': { bgcolor: '#125a9c' },
                        }}
                    >
                        <ToggleIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            )}
        </Box>
    );
}

export default ActionButtons;