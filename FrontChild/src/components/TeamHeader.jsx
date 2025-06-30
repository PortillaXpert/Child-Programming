import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useState } from 'react'

const TeamHeader = ({ isLoading, team }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMenuOpen = () => {
    setIsMenuOpen(true)
  }

  const handleMenuClose = () => {
    setIsMenuOpen(false)
  }

  return (
    <Box
      sx={{
        minHeight: '10vh',
        alignItems: 'center',
        marginRight: '15px',
        float: 'right',
        mb: '10px',
        display: 'flex'
      }}
    >
      <div>
        <Typography fontSize={'14px'} fontWeight={500} sx={{ color: 'tertiary.main' }}>
          Miembros del equipo
        </Typography>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            justifyContent: 'end',
            marginRight: '35px'
          }}
        >
          {isLoading ? null : (
            <Box sx={{ display: 'flex' }}>
              {team.slice(0, 6).map((user) => (
                <Tooltip key={user.id} title={user.name}>
                  <Avatar
                    key={user.id}
                    src={user.image}
                    sx={{
                      marginRight: '-2px',
                      width: '4px',
                      height: '4px',
                      border: `2px solid`,
                      position: 'relative',
                      zIndex: 2,
                      '&:hover': {
                        zIndex: 3,
                        position: 'relative',
                        transform: 'translateY(-4px)'
                      }
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
          )}
        </div>
      </div>
      <Divider />
      {team.length > 6 && (
        <Box sx={{ marginLeft: '30px', marginRight: '10px' }}>
          <IconButton
            onClick={handleMenuOpen}
            sx={{
              color: 'white',
              bgcolor: 'blue',
              backgroundImage: 'linear-gradient(310deg,#2152ff,#21d4fd)',
              borderRadius: '10px'
            }}
          >
            <AddIcon />
          </IconButton>
          <Menu
            anchorEl={isMenuOpen}
            open={isMenuOpen}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            getContentAnchorEl={null} // Importante para que la lista no salte
            sx={{ maxHeight: '800px', position: 'fixed', top: '18vh' }}
          >
            {team.map((user) => (
              <MenuItem key={user.id} onClick={handleMenuClose}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar src={user.image} />
                  <Typography sx={{ ml: '5px' }}>{user.name}</Typography>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </Box>
  )
}
export default TeamHeader