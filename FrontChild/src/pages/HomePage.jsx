import { useState } from 'react'
import ListOptions from '../components/others/ListOptions'
import StarIcon from '../components/icon/StarIcon'
import GroupIcon from '../components/icon/GroupIcon'
import DocIcon from '../components/icon/DocIcon'
import { Box, Card, CardContent, CardHeader, List, Typography } from '@mui/material'
import MisionComponent from '../components/homeComponenets/studenComponents/MisionComponent'
import WorkComponent from '../components/homeComponenets/WorkComponent'
import TeamComponent from '../components/homeComponenets/studenComponents/TeamComponent'
import TeacherTeamComponent from '../components/homeComponenets/teacherComponents/TeamTeacherComponent'
import MissionTeacherComponent from '../components/homeComponenets/teacherComponents/MissionTeacherComponent'
import { Assignment } from '@mui/icons-material'

const HomePage = () => {
  const [selected, setSelected] = useState({
    mision: false,
    team: false,
    assignment: false,
    task: false
  })

  const handleChangeSelected = (option) => {
    setSelected({
      mision: option === 'mision',
      team: option === 'team',
      assignment: option === 'assignment',
      task: option === 'task'
    })
  }

  const role = 'PROFESOR'

  return (
    <>
      <div style={{ minHeight: '6rem' }} />
      <div style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
        <Card sx={{ width: '20vw', height: '70vh' }}>
          <CardHeader
            sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '30px', ml: '30px' }}>
                <img src="/dashboard.svg" />
                <Typography sx={{ color: 'white', fontSize: '20px', fontWeight: 500 }}>
                  Dashboard
                </Typography>
              </Box>
            }
          />
          <CardContent>
            <List>
              <ListOptions
                icon={<StarIcon color={selected.mision ? '#1976D2' : '#64B5F6'} />}
                textOption="MISIÓN"
                option="mision"
                changeOption={handleChangeSelected}
                selected={selected.mision}
              />
              <ListOptions
                icon={<GroupIcon color={selected.team ? '#1976D2' : '#64B5F6'} />}
                textOption="EQUIPO"
                option="team"
                changeOption={handleChangeSelected}
                selected={selected.team}
              />
              {role === 'PROFESOR' && (
                <ListOptions
                  icon={<Assignment sx={{ color: selected.assignment ? '#1976D2' : '#64B5F6' , fontSize: 30 }} />}
                  textOption="ASIGNACIONES"
                  option="assignment"
                  changeOption={handleChangeSelected}
                  selected={selected.assignment}
                />
              )}
              <ListOptions
                icon={<DocIcon color={selected.task ? '#1976D2' : '#64B5F6'} />}
                textOption="TAREAS"
                option="task"
                changeOption={handleChangeSelected}
                selected={selected.task}
              />
            </List>
          </CardContent>
        </Card>

        {selected.mision ? (
          role === 'ESTUDIANTE' ? (
            <MisionComponent teamId={1} />
          ) : (
            <MissionTeacherComponent />
          )
        ) : selected.team ? (
          role === 'ESTUDIANTE' ? (
            <TeamComponent studentCode={20230005} />
          ) : (
            <TeacherTeamComponent />
          )
        ) : selected.assignment ? (
          <div>Componente de Asignaciones</div>
        ) : selected.task ? (
          <WorkComponent />
        ) : null}
      </div>
    </>
  )
}

export default HomePage