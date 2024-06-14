import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Définir le répertoire des uploads
const uploadsDir = './uploads'
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configuration de stockage de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

// Filtre de fichier pour accepter uniquement les images, vidéos et audios
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'video/mp4',
    'video/mpeg',
    'audio/mpeg',
    'audio/wav',
  ]
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        'Invalid file type. Only images, videos and audio files are allowed.'
      )
    )
  }
}

// Configuration de multer avec stockage et filtre de fichier
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // Limite de taille de fichier à 50MB
})

export default upload
