import { Box, Button, Modal, Paper, Stack, TextField } from '@mui/material'
import { HeaderPaperImg, HeaderPaperMedia } from '../components'
import React, { useState } from 'react'

function WorkSpace() {
  const [modal, setModal] = useState(false)

  const abrirCerrarModal = () => {
    setModal(!modal)
  }

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ minHeight: '8rem' }} />
      <Box sx={{ width: '100%', minHeight: '60vh', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', mb: '2rem' }}>
        <Paper elevation={3} sx={{ background: '#e9ecef', borderRadius: '0.75rem', ml: '4rem', mr: '2rem', p: '20px' }}>
          <Button onClick={() => abrirCerrarModal()}>Abrir Modal</Button>
          <Modal open={modal} onClose={abrirCerrarModal}>
            <Box
              elevation={3}
              sx={{
                background: '#D9D9D9',
                borderRadius: '0.75rem',
                ml: '50rem',
                mr: '33rem',
                mt: '8rem',
                mb: '14rem',
                p: '2px',
                backgroundColor: '#FFFFFF'
              }}
            >
              <div align="center">
                <h2>Formulario</h2>
              </div>
              <Stack gap={4}>
                <TextField inputProps={{ style: { height: '10px' } }} id="nameTask" label="Nombre Tarea" type="text" />
                <TextField inputProps={{ style: { height: '10px' } }} id="idTask" label="Identificador" type="number" />
                <TextField
                  inputProps={{ style: { height: '10px' } }}
                  id="descriptionTask"
                  label="Descripción Tarea"
                  type="text"
                />
                <TextField
                  inputProps={{ style: { height: '10px' } }}
                  id="responsablesTask"
                  label="Responsables"
                  type="text"
                />
              </Stack>

              <div align="right">
                <Button variant="contained">Crear</Button>
                <Button onClick={() => abrirCerrarModal()}>Cancelar</Button>
              </div>
            </Box>
          </Modal>
        </Paper>
        <Paper elevation={3} sx={{ background: '#e9ecef', borderRadius: '0.75rem', ml: '2rem', mr: '2rem', p: '20px' }}>
          <HeaderPaperImg title={'Fotografias'} />
        </Paper>
        <Paper elevation={3} sx={{ background: '#e9ecef', borderRadius: '0.75rem', ml: '2rem', mr: '4rem', p: '20px' }}>
          <HeaderPaperMedia title={'Multimedia'} />
        </Paper>
      </Box>
    </Box>
  )
}
export default WorkSpace
