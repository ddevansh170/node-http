const express = require('express');
const bodyparser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyparser.json());

dishRouter.route('/')
.use((req,res,next) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
  
    res.end('Will send all dishses to you!');
})
.post((req,res,next) => {
    // Use POST to add a new resource
    res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
  }) 
.put((req,res,next) => { 
      // Use PUT when you want to modify a singular resource which is already a part of resources 
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete((req,res,next) => {
    res.end('Deleting all dishes');
});



module.exports = dishRouter;  