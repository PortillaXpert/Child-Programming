import { useState } from 'react'

export function useUploadImage() {
  const [files, setFile] = useState([])

  const saveImage = (file) => {
    setFile([...files, file])
  }

  return {
    saveImage,
    files
  }
}
