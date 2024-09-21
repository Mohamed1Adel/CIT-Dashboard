const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3001;

// Set up multer for handling multipart/form-data (file uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Save files to the uploads folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename by appending a timestamp
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Endpoint to handle file uploads
app.post('/api/upload', upload.array('images', 10), (req, res) => {
  const uploadedFiles = req.files.map((file) => file.filename);
  res.json({ uploadedFiles });
});

// Serve the uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});