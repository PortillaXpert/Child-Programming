import { Box } from '@mui/material'
import { TaskGroups } from '../components'
import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import { Error } from '../components'
import { api } from '../services/endpoints'

function TablePage() {
  const [draggedTaskId, setDraggedTaskId] = useState(null)

  const { task, isLoading, error, mutate } = useTask()

  const handleDragStart = (taskId) => {
    setDraggedTaskId(taskId)
  }

  const handleDrop = (column) => {
    if (draggedTaskId === null) return
    const draggedTask = { name: draggedTaskId.name, description: draggedTaskId.description }
    if (column === 'toDo') {
      api
        .updateTask({ status: 1, ...draggedTask }, draggedTaskId.id)
        .then(() => {
          mutate()
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (column === 'inProgress') {
      api
        .updateTask({ status: 2, ...draggedTask }, draggedTaskId.id)
        .then(() => {
          mutate()
        })
        .catch((error) => {
          console.log(error)
        })
    } else if (column === 'done') {
      api
        .updateTask({ status: 3, ...draggedTask }, draggedTaskId.id)
        .then(() => {
          mutate()
        })
        .catch((error) => {
          console.log(error)
        })
    }

    setDraggedTaskId(null)
  }

  if (error) return <Error message={error.message} />

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ minHeight: '6rem' }} />
      <TaskGroups
        handleDragStart={handleDragStart}
        handleDrop={handleDrop}
        loading={isLoading}
        tasks={isLoading ? [] : task.tasks}
        mutate={mutate}
      />
    </Box>
  )
}

export default TablePage
