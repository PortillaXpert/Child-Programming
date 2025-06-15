import { api } from '../services/endpoints'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'

const DetailTaskList = ({ open, close, object, mutate }) => {
  const [taskTitle, setTaskTitle] = useState(object.name ?? '')
  const [description, setDescription] = useState(object.description ?? '')

  const handleCreateTask = () => {
    api
      .updateTask({ status: object.status, name: taskTitle, description }, object.id)
      .then(() => {
        mutate()
      })
      .catch((error) => {
        console.log(error)
      })
    close()
  }

  const onClose = () => {
    close()
    setTaskTitle(object.name ?? '')
    setDescription(object.description ?? '')
  }

  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogContent sx={{ gap: '20px', display: 'grid' }}>
        <Box sx={{ width: '100%' }}>
          <Typography fontWeight="600">Nombre tarea</Typography>
          <TextField
            sx={{ bgcolor: '#D9D9D9' }}
            autoFocus
            fullWidth
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </Box>

        <Box sx={{ width: '100%' }}>
          <Typography fontWeight="600">Descripción tarea</Typography>
          <TextField
            sx={{ bgcolor: '#D9D9D9' }}
            multiline
            fullWidth
            rows={7}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            width: '100%'
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
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DetailTaskList
