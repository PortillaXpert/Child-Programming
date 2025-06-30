import { api } from '../../services/endpoints'
import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'

const DeleteDialog = ({ open, close, idTask, mutate }) => {
  const handleCreateTask = () => {
    api
      .deleteTask(idTask)
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
  }

  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogContent sx={{ gap: '20px', display: 'grid' }}>
        <Typography>¿Desea eliminar la tarea?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ color: '#1976D2' }}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreateTask}
          sx={{ color: '#ffffff', bgcolor: '#1976D2', borderRadius: '10px' }}
          variant="contained"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
