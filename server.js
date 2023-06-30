const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Answer for server ");
});

server.listen(process.env.PORT || 3000);