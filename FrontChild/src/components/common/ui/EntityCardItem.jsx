import { Box, Typography, Avatar, Chip } from '@mui/material';
import ActionButtons from '@/components/common/ui/ActionButtons';
import { getColorByIndex } from '@/utils/const';


const EntityCardItem = ({ item, index, icon, title, subtitle, 
        chipLabel, chipColor, onEdit, onView, onDelete }) => (
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
            <Avatar sx={{ bgcolor: getColorByIndex(index), width: 40, height: 40 }}>
                {icon}
            </Avatar>
            <Box>
                <Typography fontWeight={600}>{title}</Typography>
                {subtitle && (
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
                {chipLabel && (
                    <Chip
                        label={chipLabel}
                        size="small"
                        sx={{ mt: 0.5, bgcolor: chipColor, color: 'white' }}
                    />
                )}
            </Box>
        </Box>
        <ActionButtons item={item} onEdit={onEdit} onView={onView} onDelete={onDelete} chipColor={chipColor} />
    </Box>
);

export default EntityCardItem;
