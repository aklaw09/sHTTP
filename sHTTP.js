const net = require('net');
const { Buffer } = require('node:buffer');


const server = net.createServer((conn) => {
    let data = '';
    conn.on('data', (stream) => {
        data += stream;
    });
    conn.on('end', ()=> {
        let res = data.toString('utf8', 0, 1024);
        console.log(res);
        conn.write(Buffer.from(res));
        conn.pipe(conn)
        console.log('Client has disconnected');    
    });

    conn.write("Hello!");
    conn.pipe(conn);
})

server.on("error", (err) => {
    console.log(err);
})

server.listen(8080, () => {
    console.log("sHTTP is up and running!");
})