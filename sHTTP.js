const net = require('net');
const { Buffer } = require('node:buffer');


const server = net.createServer((conn) => {
    let data = '';
    const resp = `HTTP/1.1 200 OK
                Date: Mon, 27 Jul 2009 12:28:53 GMT
                Server: sHTTP v0.5
                Last-Modified: Thu, 29 Aug 2024 19:15:56 GMT
                Content-Length: 88
                Content-Type: text/html


                Hello world! 
                sHTTP greets you!
                `;

    conn.on('data', (stream) => {
        data += stream;
        console.log("Data received");
        conn.write(Buffer.from(resp));
        conn.end();
    });
    conn.on('end', ()=> {
        conn.end();
        console.log('Client has disconnected');    
    });
})

server.on("error", (err) => {
    console.log(err);
})

server.listen(8080, () => {
    console.log("sHTTP is up and running!");
})