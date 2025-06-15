import { Box } from '@mui/material'
import ListTasks from './ListTasks'

const TaskGroups = ({ loading, tasks, handleDragStart, handleDrop, mutate }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60 vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        mb: '2rem'
      }}
    >
      <div
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={() => handleDrop('toDo')}
      >
        <ListTasks
          handleDragStart={handleDragStart}
          tasks={loading ? [] : tasks}
          title={'Por Hacer'}
          status={1}
          iconURL={'/toDo.svg'}
          mutate={mutate}
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={() => handleDrop('inProgress')}
      >
        <ListTasks
          handleDragStart={handleDragStart}
          tasks={loading ? [] : tasks}
          title={'En Marcha'}
          status={2}
          iconURL={'/inProgress.svg'}
          mutate={mutate}
        />
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault()
        }}
        onDrop={() => handleDrop('done')}
      >
        <ListTasks
          handleDragStart={handleDragStart}
          tasks={loading ? [] : tasks}
          title={'Terminado'}
          status={3}
          iconURL={'/done.svg'}
          mutate={mutate}
        />
      </div>
    </Box>
  )
}

export default TaskGroups
