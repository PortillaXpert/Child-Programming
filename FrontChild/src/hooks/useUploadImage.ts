import { useState } from "react";

interface UseUploadImage {
  saveImage: (file: File) => void;
  files: File[];
}

export const useUploadImage = (): UseUploadImage => {
  const [files, setFile] = useState<File[]>([]);

  const saveImage = (file: File): void => {
    const validFileTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validFileTypes.includes(file.type)) {
      console.error("Invalid file type. Only JPEG, PNG, and GIF are allowed.");
      return;
    }
    setFile((prevFiles) => [...prevFiles, file]);
  };

  return {
    saveImage,
    files,
  };
};
