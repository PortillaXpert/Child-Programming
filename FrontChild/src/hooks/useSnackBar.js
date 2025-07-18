import { useState } from 'react';

export function useSnackBar() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('info');

    const showSnackbar = (msg, type = 'info') => {
        setMessage(msg);
        setSeverity(type);
        setSnackbarOpen(true);
    };

    return {
        snackbarOpen,
        setSnackbarOpen,
        message,
        severity,
        showSnackbar
    };
}
