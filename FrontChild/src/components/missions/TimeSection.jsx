import { Box, Typography } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ScheduleIcon from '@mui/icons-material/Schedule';

function formatDate(iso) {
    if (!iso) return 'Fecha no disponible';
    const date = new Date(iso);
    return date.toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function TimeSection({ startDate, endDate }) {
    return (
        <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', mb: '10px', display: 'flex', alignItems: 'center', gap: 1, color: '#1976D2' }}>
                <AccessTimeIcon /> Tiempo
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, mb: 1 }}>
                <CalendarMonthIcon sx={{ color: '#1976D2' }} />
                <Typography>Inicio: {formatDate(startDate)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
                <ScheduleIcon sx={{ color: '#1976D2' }} />
                <Typography>Fin: {endDate ? formatDate(endDate) : 'Sin fecha de finalización'}</Typography>
            </Box>
        </Box>
    );
}

export default TimeSection;
