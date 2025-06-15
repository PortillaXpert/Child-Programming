import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

const ListOptions = ({ textOption, changeOption, option, selected, icon }) => {
  return (
    <ListItem>
      <ListItemButton sx={{ color: selected ? '#1976D2' : '#64B5F6' }} onClick={() => changeOption(option)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText>{textOption}</ListItemText>
      </ListItemButton>
    </ListItem>
  )
}
export default ListOptions
