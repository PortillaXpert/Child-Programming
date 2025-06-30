import { Box, Stack, TextField, Typography, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/endpoints'
import { useForm } from 'react-hook-form'

function CreateAccountPage() {
  const { mutate } = useAuth()

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      user: 'Digite su nombre',
      email: 'codegods@codegods.com',
      password: '************'
    }
  })

  const onSubmit = () => {
    return api
      .signInWithEmailAndPassword()
      .then(() => mutate())
      .catch(() => {})
  }
  return (
    <Box height="100vh" width="100vw" bgcolor="#E3F2FD" display="flex" alignItems={'center'} justifyContent={'center'}>
      <Box
        sx={{
          display: 'flex',
          borderRadius: '0 10px 10px 0',
          color: 'white',
          bgcolor: '#2979FF',
          height: '30vh',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      ></Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', maxHeight: '40vh' }}>
        <Paper
          sx={{
            p: '4rem',
            height: '620px',
            width: '620px',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                textAlign: 'center',
                justifyContent: 'center',
                borderRadius: '9px',
                bgcolor: '#2979FF',
                marginTop: '-120px',
                padding: '15px',
                width: '16vw'
              }}
            >
              <img style={{ height: '10vh' }} src="/grouplogin.svg" />
            </Box>
          </Box>
          <Box>
            <Stack gap={6} textAlign="center">
              <Box margin="auto">{/* <img src={logoFinesa} /> */}</Box>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap={6}>
                  <Stack sx={{ textAlign: 'left' }}>
                    <TextField
                      inputProps={{ style: { height: '40px' } }}
                      id="user"
                      label="Usuario"
                      {...register('user')}
                      type="text"
                    />
                  </Stack>
                  <Stack sx={{ textAlign: 'left' }}>
                    <TextField
                      inputProps={{ style: { height: '40px' } }}
                      id="email"
                      label="Correo"
                      {...register('email')}
                      type="email"
                    />
                  </Stack>
                  <Stack sx={{ textAlign: 'left' }}>
                    <TextField
                      inputProps={{ style: { height: '40px' } }}
                      id="password"
                      label="Contraseña"
                      {...register('password')}
                      type="password"
                    />
                    <Typography variant="caption">Ingrese contraseña</Typography>
                  </Stack>

                  <Stack sx={{ textAlign: 'left' }}>
                    <TextField
                      inputProps={{ style: { height: '40px' } }}
                      id="password"
                      label="Confirmar contraseña"
                      {...register('password')}
                      type="password"
                    />
                  </Stack>

                  <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                    <a style={{ color: '#1976D2' }}>CANCELAR</a>
                    <LoadingButton
                      sx={{
                        bgcolor: '#1976D2'
                      }}
                      type="submit"
                      variant="contained"
                      loading={formState.isSubmitting}
                    >
                      CREAR
                    </LoadingButton>
                  </Box>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default CreateAccountPage
