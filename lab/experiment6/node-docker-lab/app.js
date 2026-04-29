const http = require('http');

http.createServer((req, res) => {
    res.end("Modified Message - Docker Rebuild Success");
}).listen(3000);
