const http = require('http');
const fs = require('fs');
const path = require('path');


const getContentType = (filePath) => {
  const extname = path.extname(filePath);
  switch (extname) {
    case '.js':
      return 'text/javascript';
    case '.css':
      return 'text/css';
    case '.html':
      return 'text/html';
    default:
      return 'text/plain';
  }
}

http.createServer((req, res) => {
  const reqUrl = req.url;
  console.log(__dirname);
  console.log(reqUrl);
  let filePath = path.join(__dirname, reqUrl);
  if (filePath.endsWith('/')) {
    filePath += 'index.html';
  }
  if ((reqUrl.endsWith('.html') || reqUrl.endsWith('.css') || reqUrl.endsWith('.js'))) {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        const contentType = getContentType(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
      }
    });
  } else {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  }
}).listen(3001);