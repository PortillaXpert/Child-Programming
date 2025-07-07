import { Box, Avatar, Typography } from '@mui/material';

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6'];

function getColorByIndex(index) {
  return colors[index % colors.length];
}

function StudentItem({ student, index }) {
  if (!student) return null;

  return (
    <Box
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
      <Typography>{student.fullName}</Typography>
    </Box>
  );
}

export default StudentItem;
