// backend/index.js

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/db');
const Photo = require('./models/Photo');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Storage for images
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/photos', upload.single('image'), async (req, res) => {
  try {
    const newPhoto = new Photo({
      filename: req.file.filename,
      filepath: req.file.path,
      date: new Date(),
    });

    const savedPhoto = await newPhoto.save();
    res.json(savedPhoto);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save photo' });
  }
});

app.get('/api/photos', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch photos' });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.delete('/api/photos/:id', async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo) {
        return res.status(404).json({ error: 'Photo not found' });
      }
  
      fs.unlinkSync(photo.filepath); // Remove file from disk
      await Photo.findByIdAndDelete(req.params.id); // Remove from database
  
      res.json({ message: 'Photo deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete photo' });
    }
  });

  app.get('/api/photos/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath, (err) => {
      if (err) {
        res.status(500).json({ error: 'Failed to download photo' });
      }
    });
  });