import { Link, useLocation } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText, Typography, Box } from '@mui/material'
import { useDisclosure } from '../hook'

function AsideItem({ item }) {
  const isOpen = useDisclosure((state) => state.isOpen)
  const location = useLocation()
  const pathname = location.pathname
  const parts = pathname.split('/').slice(1)[0]
  const selected = parts === item.to.split('/').slice(1)[0]

  return (
    <Box
      sx={{
        display: 'flex',
        direction: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 0,
        pt: 0,
        pl: 0,
        mb: '40px'
      }}
    >
      <ListItemIcon sx={{ color: 'primary.main' }}>{selected ? item.filledIcon : item.outlineIcon}</ListItemIcon>
      <ListItemButton
        component={Link}
        key={item.to}
        to={item.to}
        sx={{
          // Set text color to white when selected
          backgroundColor: isOpen && selected ? '#1976D2' : '#90CAF9',
          borderRadius: '10px',
          boxShadow: '0px',
          display: 'flex',
          height: '40px',
          ml: '-15px',
          pb: 0,
          pt: 0,
          '&:hover': {
            backgroundColor: isOpen && selected ? '#1976D2' : '#90CAF9',
            height: '43px'
          }
        }}
      >
        <ListItemText
          sx={{
            display: isOpen ? 'block' : 'none',
            color: '#ffffff',
            marginLeft: '20px'
          }}
        >
          <Typography fontWeight={selected && 400} fontSize={selected ? '16px' : '14px'}>
            {item.name}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </Box>
  )
}

export default AsideItem
