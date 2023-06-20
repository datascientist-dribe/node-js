const requestHandler = (req,res) => {
    
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Greetings</title></head>');
        res.write('<body>Hello there user</body>');
        res.write('<body><form action="/users" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/users' && method === 'GET'){
        res.write(`<html><ul>
        <li>Coffee</li>
        <li>Tea</li>
        <li>Milk</li>
        </ul>`);
        return res.end();
    };
    if (url === '/users' && method === 'POST'){
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        console.log(body)
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            console.log(message)
            console.log(parsedBody)
            res.end();
            });
    };

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My first page</title></head>');
    res.write('<body><h1>Hello from the BE</h1></body>');
    res.write('</html>');
    res.end();
};

//module.exports = requestHandler

/* module.exports = {
    handler: requestHandler,
    someText: 'someMessage'
}; */

exports.handler = requestHandler;
exports.someText = 'some hard coded text'