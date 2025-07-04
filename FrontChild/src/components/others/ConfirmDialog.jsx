import {
    Dialog, DialogActions, DialogContent, DialogTitle,
    Button, Typography
} from '@mui/material'

function ConfirmDialog({ open, onClose, onConfirm, title, content }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Typography>{content}</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={onConfirm} color="error" variant="contained">Eliminar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog
