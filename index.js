const express = require('express'),
     http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routes/dishRouter')

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);
app.use('/dishes/:dishId', dishRouter)


app.get('/dishes/:dishId', (req,res,next) => {

  res.end('Will send details of the dish' +req.params.dishId+ " to you ");
});


app.post('/dishes/:dishId', (req,res,next) => {
    // Use POST to add a new resource
  res.statusCode = 403;
  res.end('POST operation not supported on /dishes/'+ req.params.dishId);
});

app.put('/dishes/:dishId', (req,res,next) => { 
      // Use PUT when you want to modify a singular resource which is already a part of resources 
  res.write('Updating the dish: ' + req.params.dishId + '\n');
  res.end('Will update the dish: ' + req.body.name + 
        ' with details: ' + req.body.description);
});

app.delete('/dishes/:dishId', (req,res,next) => {
  res.end('Deleting dish: ' + req.params.dishId);
});


app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');

});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

/*

const http = require('http');
const fs= require('fs');
const path = require('path');

const port = 3000;
const hostname = "localhost";

const server = http.createServer((req, res) => {
        console.log('Request for ' + req.url + ' by method ' + req.method);
      
        if (req.method == 'GET') {
          var fileUrl;
          if (req.url == '/') fileUrl = '/index.html';
          else fileUrl = req.url;
      
          var filePath = path.resolve('./public'+fileUrl);
          const fileExt = path.extname(filePath);
          if (fileExt == '.html') {
            fs.exists(filePath, (exists) => {
              if (!exists) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/html');
                res.end('<html><body><h1>Error 404: ' + fileUrl + 
                            ' not found</h1></body></html>');
                return;
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'text/html');
              fs.createReadStream(filePath).pipe(res);
            });
          }
          else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + fileUrl + 
                    ' not a HTML file</h1></body></html>');
          }
        }
        else {
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end('<html><body><h1>Error 404: ' + req.method + 
                    ' not supported</h1></body></html>');
        }
      })

server.listen(port,hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
} )

*/
