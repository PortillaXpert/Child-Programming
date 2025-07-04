import { useRef } from 'react'
import { Button, Box } from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { keyframes } from '@emotion/react'

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`

function ButtonCustom({ onClick, label }) {
    const containerRef = useRef(null)

    const handleClick = (e) => {

        if (onClick) onClick()

    }

    return (
        <Box ref={containerRef} sx={{ position: 'relative', display: 'inline-block' }}>
            <Button
                onClick={handleClick}
                variant="contained"
                endIcon={
                    <AutoAwesomeRoundedIcon
                        sx={{
                            animation: `${bounce} 1.2s infinite`,
                            color: '#FFF176',
                        }}
                    />
                }
                sx={{
                    backgroundColor: '#1976D2',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '30px',
                    padding: '12px 28px',
                    fontSize: '16px',
                    textTransform: 'none',
                    boxShadow: '0px 5px 10px rgba(0,0,0,0.15)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.06)',
                        boxShadow: '0px 8px 16px rgba(0,0,0,0.25)',
                        backgroundColor: '#1565C0',
                    },
                    overflow: 'hidden',
                }}
            >
                {label}
            </Button>
        </Box>
    )
}

export default ButtonCustom
