const express = require('express');
const multer = require('multer');
const cors = require('cors');

//Create the app
const app = express();

//App uses cors
app.use(cors());

app.use(express.static('public'));

//Specify the destination directory where the file needs to be saved
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  //Specify the name of the file. The date is prefixed to avoid overwriting of files.
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

//App saves only one file
const upload = multer({ storage }).single('file');

//endpoint upload
app.post('/upload', (req, res) => {
  upload(req, res, err => {
    console.log(req.file.filename);
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).send(req.file);
  });
});

//run the app
app.listen(8080, () => {
  console.log('App is running on port 8080!');
});
