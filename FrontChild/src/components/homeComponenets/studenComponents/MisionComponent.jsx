import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  Box,
  Stack,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getAssignments, getMissionById } from '../../../services/api/missionServiceApi'
import SkeletonCard from '../../common/skeletonCard'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import VisibilityIcon from '@mui/icons-material/Visibility'
import ScheduleIcon from '@mui/icons-material/Schedule'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ButtonCustom from '../../common/ButtonCustom'

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

  const formatDate = (iso) => {
    if (!iso) return 'Fecha no disponible'
    const date = new Date(iso)
    return date.toLocaleDateString('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) return <SkeletonCard titleLines={1} items={3} />

  if (!mission) {
    return (
      <Typography sx={{ mt: 4, color: 'red' }}>
        No se encontró ninguna misión asignada.
      </Typography>
    )
  }

  return (
    <Card sx={{ width: '50vw', height: '70vh', overflow: 'auto', 
      scrollbarColor: '#1976D2 white', scrollbarWidth: 'thin' }}>
      <CardHeader
        sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', ml: '30px' }}>
            <img src="/Iconstars.svg" alt="estrella" />
            <Typography sx={{ color: 'white', pl: '5px', fontSize: '20px', fontWeight: '500' }}>
              Misión: {mission.title}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography>{mission.description}</Typography>

        <Divider sx={{ margin: '15px 0' }} />

        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bolder', mb: '10px', color: '#1976D2' }}>
            <EmojiObjectsIcon></EmojiObjectsIcon>Objetivos
          </Typography>
          {mission.objectives.map((obj, i) => (
            <Typography key={i} sx={{ ml: 2, mb: 1 }}>
              • {obj}
            </Typography>
          ))}
        </Box>

        <Divider sx={{ margin: '15px 0' }} />

        <Box>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold', mb: '10px', color: '#1976D2' }}>
            <LibraryBooksIcon></LibraryBooksIcon> Materiales
          </Typography>

          {mission.materials && mission.materials.length > 0 ? (
            <Stack spacing={2}>
              {mission.materials.map((mat, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: '#ffffff',
                    borderRadius: 2,
                    px: 2,
                    py: 1.5,
                    boxShadow: 1,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.02)',
                      boxShadow: 3,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <InsertDriveFileIcon sx={{ color: '#1976D2' }} />
                    <Box>
                      <Typography sx={{ fontWeight: 500 }}>{mat.fileName?.replace(/\.[^/.]+$/, '')}</Typography>
                      <Box
                        sx={{
                          display: 'inline-block',
                          px: 1,
                          py: 0.2,
                          fontSize: '12px',
                          bgcolor: '#000046',
                          color: 'white',
                          borderRadius: '8px',
                          mt: 0.5,
                        }}
                      >
                        {mat.fileName?.split('.').pop()?.toUpperCase() || 'ARCHIVO'}
                      </Box>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <ArrowCircleDownIcon sx={{ color: '#1976D2', cursor: 'pointer' }} />
                  </Box>
                </Box>
              ))}
            </Stack>
          ) : (
            <Typography sx={{ ml: 2 }}>No hay materiales disponibles.</Typography>
          )}
        </Box>
        <Divider sx={{ margin: '15px 0' }} />
      <Box>
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bolder',
            mb: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: '#1976D2',
          }}
        >
        <AccessTimeIcon></AccessTimeIcon>
          Tiempo
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2, mb: 1 }}>
          <CalendarMonthIcon sx={{ color: '#1976D2' }} />
          <Typography>
            Inicio: {formatDate(mission.startDate)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
          <ScheduleIcon sx={{ color: '#1976D2' }} />
          <Typography>
            Fin:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {mission.endDate ? formatDate(mission.endDate) : 'Sin fecha de finalización'}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ margin: '15px 0' }} />
      <Box sx={{display: 'flex' , justifyContent: 'center'}}>
        <ButtonCustom label= {'Entregar Mision'}></ButtonCustom>
      </Box>
      </CardContent>
    </Card>
  )
}

export default MisionComponent
