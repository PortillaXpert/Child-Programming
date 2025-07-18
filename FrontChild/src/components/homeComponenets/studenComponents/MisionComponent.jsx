import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import { useFetchData } from '@/hooks/useFetchData'
import { getMissionById } from '@/services/api/missionServiceApi'
import { getAssignmentsByTeam } from '@/services/api/assignmentServiceApi'
import SkeletonCard from '@/components/others/skeletonCard'
import HeaderWithIcon from '@/components/common/HeaderWithIcon'
import ObjectivesSection from '@/components/missions/ObjectivesSection'
import MaterialsSection from '@/components/missions/MaterialsSection'
import TimeSection from '@/components/missions/TimeSection'
import ButtonCustom from '@/components/common/ui/ButtonCustom'

function MisionComponent({ teamId }) {

  const fetchMissionForTeam = async () => {
    const assignments = await getAssignmentsByTeam(teamId)
    if (assignments.length === 0) return null

    const firstMissionId = assignments[0].missionId
    const missionData = await getMissionById(firstMissionId)
    return missionData
  }

  const { data: mission, loading } = useFetchData(fetchMissionForTeam)

  if (loading || !mission) {
    return <SkeletonCard titleLines={1} items={0} />
  }

  return (
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
          <ButtonCustom label={'Entregar Mision'} />
        </Box>
      </CardContent>
    </Card>
  )
}

export default MisionComponent
