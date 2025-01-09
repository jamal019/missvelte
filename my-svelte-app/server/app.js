import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors'; 
import { fileURLToPath } from 'url';

// Absolute Pfade nach ES-Modul-Regeln definieren
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 7077;

app.use(cors({
  origin: 'http://localhost:5173',
}));


app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer-Konfiguration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB
  },
});
// Middleware für statische Dateien
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route für Datei-Uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    console.error('No file uploaded');
    return res.status(400).json({ error: 'No file uploaded' });
  }

  console.log('File uploaded:', req.file);
  res.json({ message: 'File uploaded successfully!', file: req.file });
});

// Test-Route
app.get('/', (req, res) => {
  res.send('Express-Server läuft!');
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
