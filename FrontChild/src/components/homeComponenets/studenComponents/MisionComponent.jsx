import {
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAssignments, getMissionById } from '@/services/api/missionServiceApi'
import SkeletonCard from '@/components/others/skeletonCard'
import HeaderWithIcon from '@/components/common/HeaderWithIcon'
import ObjectivesSection from '@/components/missions/ObjectivesSection'
import MaterialsSection from '@/components/missions/MaterialsSection'
import TimeSection from '@/components/missions/TimeSection'
import ButtonCustom from '@/components/common/ui/ButtonCustom'

function MisionComponent({ teamId }) {
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMission = async () => {
      try {
        const assignments = await getAssignments(teamId)
        if (assignments.length === 0) return

        const firstMissionId = assignments[0].missionId
        const missionData = await getMissionById(firstMissionId)
        setMission(missionData)
      } catch (err) {
        console.error('Error al obtener misión:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchMission()
  }, [])


  if (loading || !mission) {
    return <SkeletonCard titleLines={1} items={0} />
  }
  

  return (
    <Card sx={{ width: '50vw', height: '70vh', overflow: 'auto', 
      scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
        <HeaderWithIcon title={'Misión: ' + mission.title} iconSrc={'./star.svg'}>
        </HeaderWithIcon>
      <CardContent>
        <Typography>{mission.description}</Typography>
        <Divider sx={{ margin: '15px 0' }} />
        <ObjectivesSection objectives={mission.objectives} />
        <Divider sx={{ margin: '15px 0' }} />
        <MaterialsSection materials={mission.materials} />
        <Divider sx={{ margin: '15px 0' }} />
        <TimeSection startDate={mission.startDate} endDate={mission.endDate} />
        <Divider sx={{ margin: '15px 0' }} />
        <Box sx={{display: 'flex' , justifyContent: 'center'}}>
          <ButtonCustom label= {'Entregar Mision'}></ButtonCustom>
        </Box>
      </CardContent>
    </Card>
  )
}

export default MisionComponent
