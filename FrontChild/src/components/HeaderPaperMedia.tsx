import { Typography, IconButton } from '@mui/material'
import VideoFileIcon from '@mui/icons-material/VideoFile'

function HeaderPaperMedia({ title }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
        <Typography variant="h6" fontWeight="600" color={'primary.main'}>
          {title}
        </Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
        <IconButton
          sx={{
            background: '#ffffff',
            borderRadius: '10px',
            boxShadow: '0 4px 7px -1px rgba(0,0,0,.11), 0 2px 4px -1px rgba(0,0,0,.07)'
          }}
        >
          {' '}
          <VideoFileIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default HeaderPaperMedia
