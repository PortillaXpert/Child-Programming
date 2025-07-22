import { Card, CardContent, Typography, Box } from '@mui/material'
import CelebrationIcon from '@mui/icons-material/Celebration'

function NoMissionsMessage() {
    return (
        <Card sx={{ width: '50vw', height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <CelebrationIcon color="primary" sx={{ fontSize: 60 }} />
                    <Typography variant="h5" sx={{ mt: 2, textAlign: 'center' }}>
                        ¡Todas las misiones han sido completadas!
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1, textAlign: 'center' }}>
                        No tienes asignaciones pendientes por ahora. ¡Buen trabajo!
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default NoMissionsMessage
