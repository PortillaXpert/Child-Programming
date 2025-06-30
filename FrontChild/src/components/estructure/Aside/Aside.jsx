import { Fragment } from 'react'
import { items } from './Items'
import AsideItem from './AsideItem'
import { useDisclosure } from '../hook'
import { List, ListItem, ListItemText, Paper, Stack } from '@mui/material'

function Aside() {
  const isOpen = useDisclosure((state) => state.isOpen)

  return (
    <Paper
      sx={{
        width: 'fit-content',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        bgcolor: '#BBDEFB',
        p: '20px',
        marginTop: '55px'
      }}
    >
      <Stack height="fit-content" padding={1} flexDirection="row" justifyContent="space-between" alignItems="center">
        <img src="/Logo-azul.svg" />
      </Stack>
      <List sx={{ flex: 1 }}>
        {items.map((item, i) => (
          <Fragment key={i}>
            <ListItem key={i} sx={{ display: isOpen ? 'flex' : 'none' }}>
              <ListItemText>{item.name}</ListItemText>
            </ListItem>
            {item.items.map((item) => (
              <AsideItem key={item.to} item={item} />
            ))}
          </Fragment>
        ))}
      </List>
    </Paper>
  )
}

export default Aside
