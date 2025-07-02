import { Box, Skeleton, Stack, Card, CardContent, CardHeader } from '@mui/material'

function SkeletonCard({ titleLines = 1, items = 3 }) {
    return (
        <Card sx={{ width: { xs: '90vw', md: '50vw' }, height: 'auto' }}>
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
            <CardContent>
                <Skeleton width="40%" height={24} sx={{ mb: 2 }} />
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
                                py: 1,
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
