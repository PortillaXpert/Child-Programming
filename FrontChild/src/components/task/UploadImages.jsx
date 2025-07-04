import { useState } from 'react'

function UploadImages() {
  const [newImage, setnewImage] = useState(null)
  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          setnewImage(e.target.files)
        }}
      />
    </div>
  )
}

export default UploadImages
