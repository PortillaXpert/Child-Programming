import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Box,
    Avatar,
    Stack,
    Skeleton,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { getTeamByStudentCode } from '../../services/api/teamServiceApi'
import SkeletonCard from '../others/skeletonCard'

const colors = [
    '#6A5ACD',
    '#008080', 
    '#4B0082', 
    '#FF8C00',
    '#DA70D6', 
    '#4682B4', 
    '#CD5C5C', 
    '#556B2F', 
    '#B8860B', 
]


function getColorByIndex(index) {
    return colors[index % colors.length]
}


function TeamComponent({ studentCode }) {
    const [team, setTeam] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeam = async () => {
            try {
                const data = await getTeamByStudentCode(studentCode)
                setTeam(data)
            } catch (err) {
                console.error('Error al cargar equipo:', err)
            } finally {
                setLoading(false)
            }
        }

        if (studentCode) fetchTeam()
    }, [studentCode])

    return loading ? (
        <SkeletonCard titleLines={1} items={3} />
        ) : (
            <Card sx={{ width: { xs: '90vw', md: '50vw' }, height: 'auto' }}>
                <CardHeader
                    sx={{ bgcolor: '#1976D2', color: 'white', padding: '40px 20px' }}
                    title={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <img src="/group.svg" alt="Icono equipo" />
                            <Typography sx={{ fontSize: '22px', fontWeight: 600 }}>
                                {loading ? <Skeleton width={100} /> : team?.name?.toUpperCase()}
                            </Typography>
                        </Box>
                    }
                    subheader={
                        <Typography sx={{ color: 'white', fontSize: '16px', ml: '52px' }}>
                            {loading ? <Skeleton width={150} /> : `Curso: ${team.course}`}
                        </Typography>
                    }
                />
                <CardContent>
                    <Typography sx={{ fontSize: '18px', fontWeight: 600, mb: 2 }}>
                        Integrantes
                    </Typography>

                    <Stack spacing={2}>
                        {loading
                            ? [0, 1, 2].map((i) => <SkeletonItem key={i} />)
                            : team.students.map((estudiante, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        bgcolor: '#ffffff',
                                        borderRadius: 2,
                                        px: 2,
                                        py: 1,
                                        boxShadow: 1,
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                            boxShadow: 3,
                                        },
                                    }}
                                >
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
                                    <Typography>{estudiante.fullName}</Typography>
                                </Box>
                            ))}
                    </Stack>
                </CardContent>
            </Card>
        )
}

export default TeamComponent
