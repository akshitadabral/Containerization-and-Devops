const http = require('http');

http.createServer((req, res) => {
    res.end("Production Multi-Stage App");
}).listen(3000);