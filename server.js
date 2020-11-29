// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
// const { request } = require('http');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;

// Setup Server

const server = app.listen(port, listening);
function listening(){
    //console.log(server);
    console.log(`running on localhost: ${port}`);
};
  //get routs
app.get('/all', function (req, res) {
    res.send(projectData);
    
  });
//post
  app.post('/add', function (req,res){
  projectData.temp=req.body.temp;
  projectData.date=req.body.date;
  projectData.UserRes=req.body.UserRes;
  console.log("test result");
  console.log(projectData);

});

