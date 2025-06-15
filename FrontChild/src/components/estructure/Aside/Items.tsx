import { Box } from '@mui/material'

const filledStyle = {
  bgcolor: '#1976D2',
  color: '#ffffff',
  p: '2px',
  boxShadow: '0px',
  borderRadius: '99px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60px',
  minWidth: '60px'
}

const outlinedStyle = {
  bgcolor: '#90CAF9',
  color: '#ffffff',
  p: '2px',
  boxShadow: '0px',
  borderRadius: '99px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '60px',
  minWidth: '60px'
}

export const items = [
  {
    items: [
      {
        outlineIcon: (
          <Box sx={outlinedStyle}>
            <img src="/dashboard.svg" />
          </Box>
        ),
        filledIcon: (
          <Box sx={filledStyle}>
            <img src="/dashboard.svg" />
          </Box>
        ),
        name: 'Dashboard',
        to: '/home'
      },
      {
        outlineIcon: (
          <Box sx={outlinedStyle}>
            <img src="/table.svg" />
          </Box>
        ),
        filledIcon: (
          <Box sx={filledStyle}>
            <img src="/table.svg" />
          </Box>
        ),
        name: 'Tabla de tareas',
        to: '/table'
      },
      {
        outlineIcon: (
          <Box sx={outlinedStyle}>
            <img src="/space.svg" />
          </Box>
        ),
        filledIcon: (
          <Box sx={filledStyle}>
            <img src="/space.svg" />
          </Box>
        ),
        name: 'Documentos',
        to: '/workspace'
      },
      {
        outlineIcon: (
          <Box sx={outlinedStyle}>
            <img src="/document.svg" />
          </Box>
        ),
        filledIcon: (
          <Box sx={filledStyle}>
            <img src="/document.svg" />
          </Box>
        ),
        name: 'Documentos',
        to: '/document'
      }
    ]
  }
]
