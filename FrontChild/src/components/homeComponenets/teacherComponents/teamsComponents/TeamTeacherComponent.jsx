import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Avatar,
    Stack,
    IconButton,
    TextField,
    InputAdornment,
    Divider,
} from '@mui/material'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import GroupIcon from '@mui/icons-material/Group'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getAllTeams } from '../../../../services/api/teamServiceApi'
import SkeletonCard from '../../../common/skeletonCard'
import { Visibility } from '@mui/icons-material'
import TeamDetailDialog from './TeamDetailDialog'

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6']

function getColorByIndex(index) {
    return colors[index % colors.length]
}

function TeamTeacherComponent() {
    const [teams, setTeams] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedTeamId, setSelectedTeamId] = useState(null)

    const handleOpenDialog = (id) => {
        setSelectedTeamId(id)
        setOpenDialog(true)
    }
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const data = await getAllTeams()
                setTeams(data)
            } catch (err) {
                console.error('Error al cargar equipos:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [])

    const filteredTeams = teams.filter((team) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <Card sx={{ width: { xs: '90vw', md: '50vw' }, height: 'auto' }}>
            <CardHeader
                sx={{ bgcolor: '#1976D2', color: 'white', p: 3 }}
                title={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <GroupIcon sx={{ fontSize: 32 }} />
                            <Typography sx={{ fontSize: 22, fontWeight: 600 }}>Gestión de Equipos</Typography>
                        </Box>
                        <IconButton color="inherit" onClick={() => alert('Crear equipo')}>
                            <AddCircleOutlineIcon sx={{ fontSize: 20 }} /> 
                            <Typography sx={{ fontSize: 18, marginLeft: '2px'}}>Crear Equipo</Typography>
                        </IconButton>
                    </Box>
                }
            />
            <CardContent>
                <TextField
                    label="Buscar equipo"
                    fullWidth
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                    size="small"
                    sx={{ mb: 3 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                {loading ? (
                    <SkeletonCard titleLines={1} items={3} />
                ) : filteredTeams.length === 0 ? (
                    <Typography color="text.secondary">No se encontraron equipos.</Typography>
                ) : (
                    <Stack spacing={2}>
                        {filteredTeams.map((team, index) => (
                            <Box
                                key={index}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    bgcolor: '#ffffff',
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    boxShadow: 1,
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'scale(1.01)',
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Avatar
                                        src="/caticon.svg"
                                        alt="Ícono gato"
                                        sx={{
                                            bgcolor: getColorByIndex(index),
                                            width: 40,
                                            height: 40,
                                            p: 1.2,
                                        }}
                                    />
                                    <Box>
                                        <Typography sx={{ fontWeight: 600 }}>{team.name}</Typography>
                                        <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                            Curso: {team.course} • {team.students.length} estudiantes
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <IconButton onClick={() => handleOpenDialog(team.id)}>
                                        <Visibility/>
                                    </IconButton>
                                    <IconButton onClick={() => alert(`Eliminar equipo ${team.name}`)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                )}
            </CardContent>
            <TeamDetailDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                teamId={selectedTeamId}
            />
        </Card>
    )
}

export default TeamTeacherComponent
