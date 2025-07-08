import { Box, Typography } from '@mui/material';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';

function ObjectivesSection({ objectives }) {
    return (
        <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', mb: '10px', color: '#1976D2' }}>
                <EmojiObjectsIcon /> Objetivos
            </Typography>
            {objectives.map((obj, i) => (
                <Typography key={i} sx={{ ml: 2, mb: 1 }}>
                    • {obj}
                </Typography>
            ))}
        </Box>
    );
}

export default ObjectivesSection;
