// components/teams/StudentItem.jsx
import { Box, Avatar, Typography, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const colors = ['#6A5ACD', '#008080', '#4B0082', '#FF8C00', '#DA70D6'];

function getColorByIndex(index) {
  return colors[index % colors.length];
}

function StudentItem({ student, index, showCode = false, avatarSize = 40, background = '#ffffff', onDelete = null }) {
  if (!student) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: background,
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
      <Box display="flex" alignItems="center" gap={2}>
        <Avatar
          src="/caticon.svg"
          alt="Ícono gato"
          sx={{
            bgcolor: getColorByIndex(index),
            width: avatarSize,
            height: avatarSize,
            p: 1.2,
          }}
        />
        <Box>
          <Typography fontWeight={500}>{student.fullName}</Typography>
          {showCode && (
            <Chip
              label={`Cod: ${student.studentCod}`}
              size="small"
              sx={{
                mt: 0.5,
                bgcolor: getColorByIndex(index),
                color: 'white',
                fontWeight: 'bold'
              }}
            />
          )}
        </Box>
      </Box>

      {onDelete && (
        <IconButton onClick={() => onDelete(student)}>
          <DeleteIcon sx={{ color: '#D32F2F' }} />
        </IconButton>
      )}
    </Box>
  );
}

export default StudentItem;
