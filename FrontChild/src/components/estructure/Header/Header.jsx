import { Avatar, IconButton, Stack, styled } from '@mui/material'
import MuiAppBar from '@mui/material/AppBar'
import { useDisclosure } from '../hook'
import { usePopover } from '../../../hooks/usePopover'
import { AccountPopOver } from '../../others/AccountPopOver'
import MenuIcon from '@mui/icons-material/Menu'

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme }) => ({
  marginTop: theme.spacing(1),
  borderRadius: '10px',
  backgroundColor: '#ffffff',
  marginLeft: '20px',
  marginRight: '20px',
  width: `calc(100% - 40px)`
}))
function Header() {
  const isOpen = useDisclosure((state) => state.isOpen)
  const toggle = useDisclosure((state) => state.toggle)
  const accountPopover = usePopover()
  return (
    <AppBar open={isOpen}>
      <Stack
        justifyContent="space-between"
        height="68px"
        paddingY={1}
        paddingX={2}
        alignItems="center"
        flexDirection="row"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconButton onClick={toggle}>
            <MenuIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        </div>

        <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
          <Avatar sx={{ bgcolor: '#304FFE' }}>
            <img src="/caticon.svg" />
          </Avatar>
          <Avatar sx={{ bgcolor: '#FFC400' }}>
            <img src="/caticon.svg" />
          </Avatar>
          <Avatar sx={{ bgcolor: '#F8BBD0' }}>
            <img src="/caticon.svg" />
          </Avatar>
          <Avatar
            onClick={accountPopover.handleOpen}
            ref={accountPopover.anchorRef}
            sx={{ bgcolor: '#4CAF50', cursor: 'pointer' }}
          >
            <img src="/caticon.svg" />
          </Avatar>
        </Stack>
        <AccountPopOver
          anchorEl={accountPopover.anchorRef.current}
          open={accountPopover.open}
          onClose={accountPopover.handleClose}
        />
      </Stack>
    </AppBar>
  )
}

export default Header
