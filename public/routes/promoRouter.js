const express = require('express');
const bodyparser = require('body-parser');

const promotionRouter = express.Router();
promotionRouter.use(bodyparser.json());

promotionRouter.route('/')
.use((req,res,next) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
  
    res.end('Will send all promotions to you!');
})
.post((req,res,next) => {
    // Use POST to add a new resource
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
  }) 
.put((req,res,next) => { 
      // Use PUT when you want to modify a singular resource which is already a part of resources 
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req,res,next) => {
    res.end('Deleting all promotions');
});


promotionRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send details of the promotion' +req.params.promoId + " to you ");
})
.post((req,res,next) => {
      // Use POST to add a new resource
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req,res,next) => { 
        // Use PUT when you want to modify a singular resource which is already a part of resources 
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
          ' with details: ' + req.body.description);
  })
.delete((req,res,next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});
  



module.exports = promotionRouter;  