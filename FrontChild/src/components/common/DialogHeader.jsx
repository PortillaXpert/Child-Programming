import { DialogTitle, IconButton, Box, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const DialogHeader = ({ title, onClose }) => (
    <DialogTitle sx={{ bgcolor: '#1976D2', color: 'white' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontWeight={600}>{title}</Typography>
            {onClose && (
                <IconButton onClick={onClose} sx={{ color: 'white' }}>
                    <CloseIcon />
                </IconButton>
            )}
        </Box>
    </DialogTitle>
)

export default DialogHeader
