import { CardHeader } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function FormHeader({ title, onBack }) {
    return (
        <CardHeader
            sx={{ bgcolor: '#1976D2', color: 'white' }}
            title={
                <Box display="flex" alignItems="center" gap={2}>
                    <IconButton onClick={onBack} sx={{ color: 'white' }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6">{title}</Typography>
                </Box>
            }
        />
    );
}

export default FormHeader;