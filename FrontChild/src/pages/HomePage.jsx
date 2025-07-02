import { useState } from 'react'
import ListOptions from '../components/others/ListOptions'
import StarIcon from '../components/icon/StarIcon'
import GroupIcon from '../components/icon/GroupIcon'
import DocIcon from '../components/icon/DocIcon'
import { Box, Card, CardContent, CardHeader, List, Typography } from '@mui/material'
import MisionComponent from '../components/homeComponenets/misionComponent'
import WorkComponent from '../components/homeComponenets/WorkComponent'
import TeamComponent from '../components/homeComponenets/TeamComponent'

const HomePage = () => {
  const [selected, setSelected] = useState({ mision: false, team: false, task: false })

  const handleChangeSelected = (option) => {
    if (option === 'mision') setSelected({ mision: true, team: false, task: false })
    else if (option === 'team') setSelected({ mision: false, team: true, task: false })
    else setSelected({ mision: false, team: false, task: true })
  }

  return (
    <>
      <div style={{ minHeight: '6rem' }} />
      <div style={{ display: 'flex', gap: '20px', marginLeft: '20px' }}>
        <Card sx={{ width: '20vw', height: '70vh' }}>
          <CardHeader
            sx={{ bgcolor: '#1976D2', color: 'white', padding: '50px 10px' }}
            title={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '30px', ml: '30px' }}>
                <img src="/dashboard.svg" />
                <Typography sx={{ color: 'white', pl: '5px', fontSize: '20px', fontWeight: '500' }}>
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
          <MisionComponent teamId={1}/>
        ) : selected.team ? (
          <TeamComponent  studentCode={20230005}/>
        ) : selected.task ? (
          <WorkComponent />
        ) : null}
      </div>
    </>
  )
}

export default HomePage
