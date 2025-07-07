import { Box, Typography } from '@mui/material';

function HeaderWithIcon({ title, subtitle, iconSrc }) {
    return (
        <Box
            sx={{
                bgcolor: '#1976D2',
                color: 'white',
                p: 3,
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <img src={iconSrc} alt="Ícono" style={{ width: 32, height: 32 }} />
                <Box>
                    <Typography sx={{ fontSize: 22, fontWeight: 600 }}>{title}</Typography>
                    {subtitle && (
                        <Typography sx={{ fontSize: 16, color: 'white' }}>{subtitle}</Typography>
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default HeaderWithIcon;
