const http = require('http');
const { url } = require('inspector');
const fs = require('fs');

function rqListener(req, res) {

}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method, req.headers);
    //process.exit();
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title> My first page</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt', message);
        });
        res.statusCode = 302;
        res.setHeader('Location', '/')
    }
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My first page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);