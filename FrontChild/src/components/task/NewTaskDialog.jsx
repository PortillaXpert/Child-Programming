import { api } from '../../services/endpoints'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'

const NewTaskDialog = ({ open, close, mutate }) => {
  const [taskTitle, setTaskTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleCreateTask = () => {
    const newTask = {
      name: taskTitle,
      description,
      status: 1
    }
    api
      .postTask(newTask)
      .then(() => {
        close()
        mutate()
        setTaskTitle('')
        setDescription('')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const onClose = () => {
    close()
    setTaskTitle('')
    setDescription('')
  }

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="md">
      <DialogContent sx={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px' }}>
        <Box>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', alignItems: 'center', width: '100%' }}
          >
            <Typography fontWeight="600">Nombre tarea</Typography>
            <TextField
              sx={{ bgcolor: '#D9D9D9' }}
              autoFocus
              margin="dense"
              fullWidth
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Box>
          <Box
            sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px', alignItems: 'center', width: '100%' }}
          >
            <Typography fontWeight="600">Descripción tarea</Typography>
            <TextField
              sx={{ bgcolor: '#D9D9D9' }}
              margin="dense"
              multiline
              rows={5}
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '10px',
              alignItems: 'center',
              width: '100%',
              mt: '20px'
            }}
          >
            <Typography fontWeight="600">Responsables</Typography>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                bgcolor: '#D9D9D9',
                p: 1,
                borderRadius: '5px'
              }}
            >
              <Avatar sx={{ bgcolor: '#304FFE' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Avatar sx={{ bgcolor: '#FFC400' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Avatar sx={{ bgcolor: '#F8BBD0' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Avatar sx={{ bgcolor: '#4CAF50' }}>
                <img src="/caticon.svg" />
              </Avatar>
            </Stack>
          </Box>
        </Box>
        <Card sx={{ width: 'auto', height: '100%', bgcolor: '#FAFAFA' }}>
          <CardHeader
            sx={{ bgcolor: '#1976D2', color: 'white' }}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="/iconteam.svg" />
                <Typography sx={{ color: 'white', pl: '5px', fontSize: '16px', fontWeight: '500' }}>Equipo</Typography>
              </Box>
            }
          />
          <CardContent sx={{ display: 'grid', gridTemplateRows: '1fr', gap: '20px', justifyContent: 'center' }}>
            <Box>
              <Avatar sx={{ bgcolor: '#304FFE' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Typography> user 1</Typography>
            </Box>
            <Box>
              <Avatar sx={{ bgcolor: '#FFC400' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Typography> user 2</Typography>
            </Box>
            <Box>
              <Avatar sx={{ bgcolor: '#F8BBD0' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Typography> user 3</Typography>
            </Box>
            <Box>
              <Avatar sx={{ bgcolor: '#4CAF50' }}>
                <img src="/caticon.svg" />
              </Avatar>
              <Typography> user 4</Typography>
            </Box>
          </CardContent>
        </Card>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#1976D2' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreateTask}
          sx={{ color: '#ffffff', bgcolor: '#1976D2', borderRadius: '10px' }}
          variant="contained"
          disabled={taskTitle === ''}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewTaskDialog
