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
  limits : {fileSize: 1000000},
  fileFilter: function(req,file,cb){
     // Check File Type
    checkFileType(file, cb)
  }
}).single('myUploadedImage')


// Check File Extension ( jpeg / jpg / png / gif ) & Mine/Type

function checkFileType(file,cb) {
  // Allowed Extention
  const filetypes = /jpeg|jpg|png|gif/ ;

  // Check Extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return cb(null,true)
  }else {
    cb('Error: Images Only...')
  }
}


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
    if(err)
    {
      res.render('index' , {
        msg : err
      })
    }
    else
    {
          if(req.file == undefined) {
            res.render('index' , {
              msg : "No File Attached..."
            })
          }
          res.render("index" , {
            msgSuccess : "Image Uploaded Successfully!",
            image : `uploads/${req.file.filename}`
          })
    }
  })

})

// Port Declaration
const port = 3000;


app.listen(port, () => {
  console.log(`We are live on port ${port}`)
})
