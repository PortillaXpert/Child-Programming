import { CardContent, Typography, Box, Card, CardHeader, Button, IconButton } from '@mui/material'
import { CancelRounded } from '@mui/icons-material'
import { useTask } from '../../hooks/useTask'
import NewTaskDialog from '../task/NewTaskDialog'
import { useState } from 'react'
import { Error } from '..'
import DeleteDialog from '../others/dialog/DeleteDialog'
import { useNavigate } from 'react-router-dom'

function WorkComponent() {
  const [open, setOpen] = useState(false)
  const [selectedDelete, setSelectedDelete] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  const navigate = useNavigate()

  const handleClose = () => {
    setOpen(false)
  }
  const handleCloseDelete = () => {
    setOpenDelete(false)
    setSelectedTaskId(null)
  }
  const handleOpenDelete = (id) => {
    setOpenDelete(true)
    setSelectedTaskId(id)
  }
  const { task, isLoading, error, mutate } = useTask()
  const workTask = isLoading ? [] : task.tasks

  if (error) return <Error message={error.message} />
  return (
    <>
      <DeleteDialog open={openDelete} close={handleCloseDelete} idTask={selectedTaskId} mutate={mutate} />
      <NewTaskDialog open={open} close={handleClose} mutate={mutate} />
      <Card sx={{ width: '50vw', height: '85vh' }}>
        <CardHeader
          sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
          title={
            <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '30px', ml: '30px' }}>
              <img src="/whitetask.svg" />
              <Typography sx={{ color: 'white', pl: '5px', fontSize: '20px', fontWeight: '500' }}>
                {' '}
                Plan de Tareas
              </Typography>
            </Box>
          }
        />
        <CardContent sx={{ p: '20px' }}>
          <Box sx={{ bgcolor: '#F1F1F1', width: '100%', height: '60vh', display: 'flex', gap: '20px', p: '20px' }}>
            {workTask.map((objTask) => (
              <Box
                key={objTask.id}
                sx={{
                  width: '110px',
                  height: '140px',
                  bgcolor: '#FFE082',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                  },
                  ...(selectedDelete && {
                    animation: 'vibrate 0.3s ease-in-out infinite',
                    transformOrigin: '50% 50%'
                  }),
                  '@keyframes vibrate': {
                    '0%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' },
                    '100%': { transform: 'rotate(-1deg)' }
                  }
                }}
              >
                {selectedDelete && (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: -10,
                      p: 0,
                      right: -10,
                      bgcolor: 'rgba(255, 255, 255, 0.8)' // Fondo semitransparente blanco
                    }}
                    onClick={() => {
                      handleOpenDelete(objTask.id)
                    }}
                  >
                    <CancelRounded sx={{ color: '#E41919' }} />
                  </IconButton>
                )}

                <Typography>{objTask.name}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between', pt: 2 }}>
            <Button
              sx={{ color: '#64B5F6' }}
              onClick={() => {
                setOpen(true)
              }}
            >
              Crear tarea
            </Button>
            <Button
              sx={{
                color: selectedDelete ? '#FFF' : '#1976D2', // Color blanco cuando está seleccionado, azul de lo contrario
                bgcolor: selectedDelete ? '#1976D2' : 'transparent'
              }}
              onClick={() => setSelectedDelete(!selectedDelete)}
            >
              Eliminar
            </Button>
            <Button
              sx={{ bgcolor: '#42A5F5' }}
              variant="contained"
              onClick={() => {
                navigate('/table')
              }}
            >
              Siguiente
            </Button>
          </Box>
        </CardContent>
      </Card>
    </>
  )
}
export default WorkComponent
