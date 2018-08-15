const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

// Initializing Express Server
const app = express();


// Set View Engine As EJS

app.set('view engine' , 'ejs');


// Serving Static Files from Public Folder

app.use(express.static(__dirname + '/public'))


app.get('/' , (req,res) => {
  res.send('index')
})

app.get('/ejs' , (req,res) => {
  res.render('index')
})


// Port Declaration
const port = 3000;


app.listen(port, () => {
  console.log(`We are live on port ${port}`)
})
