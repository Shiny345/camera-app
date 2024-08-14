// backend/routes/photoRoutes.js
const express = require('express');
const multer = require('multer');
const Photo = require('../models/Photo');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('photo'), async (req, res) => {
  try {
    const newPhoto = new Photo({
      filename: req.file.filename,
    });
    await newPhoto.save();
    res.json(newPhoto);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
