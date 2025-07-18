import { Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import { CheckCircle } from '@mui/icons-material';
import TooltipIconButton from '@/components/common/ui/TooltipIconButton';

function ActionButtons({ onEdit, onView, onDelete, item, chipColor }) {

    const isActive = chipColor === 'gray';
    const toggleTooltip = isActive ? 'Activar' : 'Desactivar';
    const ToggleIcon = isActive ? <CheckCircle fontSize="small" /> : <BlockIcon fontSize="small" />;

    return (
        <Box display="flex" gap="4px">
            {onEdit && (
                <TooltipIconButton
                    title="Editar"
                    icon={<EditIcon fontSize="small" />}
                    onClick={() => onEdit(item.id)}
                />
            )}

            {onView && (
                <TooltipIconButton
                    title="Ver"
                    icon={<VisibilityIcon fontSize="small" />}
                    onClick={() => onView(item.id)}
                />
            )}

            {onDelete && (
                <TooltipIconButton
                    title={toggleTooltip}
                    icon={ToggleIcon}
                    onClick={() => onDelete(item)}
                />
            )}
        </Box>
    );
}

export default ActionButtons;