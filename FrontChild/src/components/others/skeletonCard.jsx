import { Box, Skeleton, Stack, CardHeader, CardContent, Card } from '@mui/material'

function SkeletonCard({ titleLines = 0, items = 3 }) {
    return (
        <Card sx={{ width: '50vw', height: '70vh', boxShadow: 0 }}>
            {titleLines > 0 && (
                <CardHeader
                    sx={{ bgcolor: '#1976D2', color: 'white', padding: '40px 20px' }}
                    title={
                        <Stack spacing={1}>
                            {[...Array(titleLines)].map((_, i) => (
                                <Skeleton key={i} width="60%" height={28} />
                            ))}
                        </Stack>
                    }
                    subheader={<Skeleton width="40%" height={20} sx={{ ml: 6, mt: 1 }} />}
                />
            )}

            <CardContent>
                <Stack spacing={2}>
                    {[...Array(items)].map((_, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                bgcolor: '#ffffff',
                                borderRadius: 2,
                                px: 2,
                                py: 1.2,
                                boxShadow: 1,
                            }}
                        >
                            <Skeleton variant="circular" width={40} height={40} />
                            <Skeleton variant="text" width="60%" height={20} />
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    )
}



export default SkeletonCard
