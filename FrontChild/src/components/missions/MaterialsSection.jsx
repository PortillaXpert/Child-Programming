import { Box, Typography, Stack } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

function MaterialsSection({ materials }) {
    return (
        <Box>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', mb: '10px', color: '#1976D2' }}>
                <LibraryBooksIcon /> Materiales
            </Typography>

            {materials?.length > 0 ? (
                <Stack spacing={2}>
                    {materials.map((mat, idx) => (
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
                                    <Typography sx={{ fontWeight: 500 }}>
                                        {mat.fileName?.replace(/\.[^/.]+$/, '')}
                                    </Typography>
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
                            <ArrowCircleDownIcon sx={{ color: '#1976D2', cursor: 'pointer' }} />
                        </Box>
                    ))}
                </Stack>
            ) : (
                <Typography sx={{ ml: 2 }}>No hay materiales disponibles.</Typography>
            )}
        </Box>
    );
}

export default MaterialsSection;
