import { IconButton, Tooltip } from '@mui/material';

const tooltipStyles = {
    sx: {
        bgcolor: '#1976D2',
        color: 'white',
        fontSize: '0.875rem',
        borderRadius: 1,
        px: 1.5,
        py: 0.5,
    },
};


function TooltipIconButton({ title, icon, onClick, disabled = false, size = 'small' }) {
    return (
        <Tooltip
            title={title}
            componentsProps={{ tooltip: tooltipStyles }}
            disableHoverListener={disabled}
        >
            <span>
                <IconButton
                    size={size}
                    onClick={onClick}
                    disabled={disabled}
                    sx={{bgcolor: '#1976D2',
                        color: 'white',
                        '&:hover': { bgcolor: '#125a9c' }}}
                >
                    {icon}
                </IconButton>
            </span>
        </Tooltip>
    );
}

export default TooltipIconButton;