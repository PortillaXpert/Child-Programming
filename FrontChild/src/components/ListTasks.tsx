import { Box, Card, CardContent, CardHeader, Typography } from '@mui/material'
import ListTask from './ListTask'

const ListTasks = ({ tasks, handleDragStart, title, status, iconURL, mutate }) => {
  return (
    <Card
      sx={{
        borderRadius: '0.75rem',
        ml: '4rem',
        mr: '2rem',
        position: 'relative',
        maxWidth: '25vw'
      }}
    >
      <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '30px', ml: '30px' }}>
            <img src={iconURL} />
            <Typography sx={{ color: 'white', pl: '5px', fontSize: '20px', fontWeight: '500' }}>{title}</Typography>
          </Box>
        }
      />
      <CardContent
        sx={{
          p: '20px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          justifyContent: 'center',
          gap: '20px'
        }}
      >
        {tasks.map(
          (object) =>
            object.status === status && (
              <ListTask task={object} key={object.id} onDragStart={handleDragStart} mutate={mutate} />
            )
        )}
      </CardContent>
    </Card>
  )
}
export default ListTasks
