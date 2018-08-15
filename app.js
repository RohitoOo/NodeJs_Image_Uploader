const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');


// Set Storage Engine  [ MULTER ]

const storage = multer.diskStorage({
  destination : './public/uploads',
  filename : function(req,file,cb){
    cb(null , file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})


// Initializing Upload [ Multer ]

// Single Vs Multiple Images [ array ]
// 1MB = 1000000 bytes

const upload = multer({
  storage : storage,
  limits : {fileSize: 1000000}
}).single('myUploadedImage')

// Initializing Express Server
const app = express();

// Set View Engine As EJS

app.set('view engine' , 'ejs');


// Serving Static Files from Public Folder

app.use(express.static(__dirname + '/public'))


app.get('/' , (req,res) => {
  res.render('index')
})

app.post('/upload' , (req,res) => {

  upload(req,res, (err) => {
    if(err) {
      res.render('index' , {
        msg : err
      })
    }else{
      console.log(req.file)
    }
  })

})

// Port Declaration
const port = 3000;


app.listen(port, () => {
  console.log(`We are live on port ${port}`)
})
