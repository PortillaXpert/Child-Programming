import { Avatar, Stack, Typography } from '@mui/material'

function Session() {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 1 }}>
      <Avatar />
      <Stack>
        <Typography color="text.secondary">code gods</Typography>
        <Typography color="primary.main" fontSize="14px">
          Coordinador
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Session
