import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import { useFetchData } from '@/hooks/dataHooks/useFetchData'
import { getMissionById } from '@/services/api/missionServiceApi'
import { getAssignmentsByTeam } from '@/services/api/assignmentServiceApi'
import SkeletonCard from '@/components/others/skeletonCard'
import HeaderWithIcon from '@/components/common/HeaderWithIcon'
import ObjectivesSection from '@/components/missions/ObjectivesSection'
import MaterialsSection from '@/components/missions/MaterialsSection'
import TimeSection from '@/components/missions/TimeSection'
import ButtonCustom from '@/components/common/ui/ButtonCustom'
import CustomSnackBar from '@/components/common/ui/CustomSnackBar'
import NoAssignmentsMessage from '@/components/missions/NoMissionsMessage'
import { useState } from 'react'
import { updateAssignmentTasks } from '@/services/api/assignmentServiceApi'

function MisionComponent({ teamId }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState('')
  const [severity, setSeverity] = useState('success')
  const [assignment, setAssignment] = useState(null)

  const fetchMissionForTeam = async () => {
    const assignments = await getAssignmentsByTeam(teamId)
    if (assignments.length === 0) return null
    setAssignment(assignments[0])
    const missionData = await getMissionById(assignments[0].missionId)
    return missionData
  }

  const { data: mission, loading } = useFetchData(fetchMissionForTeam)

  const handleSave = async () => {
    try {
      if (!assignment) return
      const task = [
        {
          id: 6,
          title: "Leer documentación del proyecto",
          assignmentId: assignment.id
        },
        {
          id: 7,
          title: "Diseñar esquema de base de datos",
          assignmentId: assignment.id
        },
        {
          id: 8,
          title: "Implementar API REST",
          assignmentId: assignment.id
        }
      ]
      await updateAssignmentTasks(assignment.id, task)
      setSnackbarMessage('Misión entregada')
      setSeverity('success')
    } catch (error) {
      setSnackbarMessage('Error al hacer la entrega')
      setSeverity('error')
    } finally {
      setSnackbarOpen(true)
    }
  }

  if (loading) return <SkeletonCard titleLines={1} items={0} />
  if (!mission) return <NoAssignmentsMessage />

  return (
    <>
      <Card
        sx={{
          width: '50vw',
          height: '70vh',
          overflow: 'auto',
          scrollbarColor: '#1976D2 white',
          scrollbarWidth: 'thin',
        }}
      >
        <HeaderWithIcon title={'Misión: ' + mission.title} iconSrc={'./star.svg'} />
        <CardContent>
          <Typography>{mission.description}</Typography>
          <Divider sx={{ margin: '15px 0' }} />
          <ObjectivesSection objectives={mission.objectives} />
          <Divider sx={{ margin: '15px 0' }} />
          <MaterialsSection materials={mission.materials} />
          <Divider sx={{ margin: '15px 0' }} />
          <TimeSection startDate={mission.startDate} endDate={mission.endDate} />
          <Divider sx={{ margin: '15px 0' }} />
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <ButtonCustom onClick={handleSave} label={'Entregar Misión'} />
          </Box>
        </CardContent>
      </Card>
      <CustomSnackBar
        message={snackbarMessage}
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        severity={severity}
      />
    </>
  )
}

export default MisionComponent
