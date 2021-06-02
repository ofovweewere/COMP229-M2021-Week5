import http from 'http';
import path from 'path';
import fs from 'fs';
const { Console } = require('console');


const hostname: string = '127.0.0.1';
const port: number = 3000;


//console.log(__dirname);
const server: http.Server = http.createServer((req, res) =>
{
  //res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  //res.end('Hello World!');
  displayHome(res);
});



server.listen(port, hostname, () => 
{
  console.log(`Server running at http://${hostname}:${port}/`);
});

function displayHome(res: http.ServerResponse): void
{
  fs.readFile("index.html",(err,data)=>
  {
    if(err)
    {
      res.writeHead(404);
      res.end("ERROR: 404 - Page not found");
      console.log("Error");
      return;
    }
    res.writeHead(200);
    res.end(data);
    console.log(data);
  });
}