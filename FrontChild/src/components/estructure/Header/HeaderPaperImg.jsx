import { IconButton, Typography, Box } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { useState, useRef } from 'react'

const HeaderPaperImg = ({ title }) => {
  const [newImage, setnewImage] = useState(null)
  const fileRef = useRef(null)
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', marginBottom: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
          <Typography variant="h6" fontWeight="600" color={'primary.main'}>
            {title}
          </Typography>
        </div>
        <div style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <Box>
            <input
              ref={fileRef}
              style={{ display: 'none' }}
              type="file"
              onChange={(e) => {
                setnewImage(e.target.files[0])
              }}
            />
            <IconButton
              sx={{
                background: '#ffffff',
                borderRadius: '10px',
                boxShadow: '0 4px 7px -1px rgba(0,0,0,.11), 0 2px 4px -1px rgba(0,0,0,.07)'
              }}
              onClick={() => {
                fileRef.current && fileRef.current.click()
              }}
            >
              <AddPhotoAlternateIcon />
            </IconButton>
          </Box>
        </div>
      </div>
    </>
  )
}

export default HeaderPaperImg
