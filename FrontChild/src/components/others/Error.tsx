import DeleteIcon from '@mui/icons-material/Delete'
import { Box, Stack, Typography } from '@mui/material'
import { api } from '../../services/endpoints'
import { useAuth } from '../../hooks/useAuth'

const Error = ({ message }) => {
  const { mutate } = useAuth()
  api.signOut()
  mutate()
  return (
    <Box sx={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100%' }}>
      <Stack sx={{ textAlign: 'center', gap: 3 }}>
        <DeleteIcon sx={{ height: '400px' }} />
        <Typography>Ups a ocurrido un error</Typography>
        <Typography>{message}</Typography>
      </Stack>
    </Box>
  )
}

export default Error
