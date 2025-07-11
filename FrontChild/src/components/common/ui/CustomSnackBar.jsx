import { Snackbar, Alert } from '@mui/material';

function CustomSnackBar({ message, snackbarOpen, 
            setSnackbarOpen, severity, autoHideDuration = 3000 }) {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={snackbarOpen}
            autoHideDuration={autoHideDuration}
            onClose={() => setSnackbarOpen(false)}
        >
            <Alert
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default CustomSnackBar;