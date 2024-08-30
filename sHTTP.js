import { TcpServer } from "./TcpServer";
import * as fs from 'node:fs';

class sHTTP extends TcpServer {

    listen(port) {
        this.server.listen(port, () => {
            console.log("sHTTP listening on port:", port);
        })
    }

    reqHandler(rawData, conn) {
        console.log("sHTTP is handling this now");
        let data = rawData.toString().split('\r\n');
        this.parse(data, (err, resp) => {
            console.log(resp)
            super.reqHandler(resp, conn);
        });
    }

    parse(data, callback) {
        let [method, resource, protocol] = data[0].split(' ');
        let contentType;
        resource.split('.')[1] === "ico" ? contentType = "image/x-icon" : contentType = "text/html";
        if(resource.length === 1) resource += 'index.html';
        resource = "resources" + resource;
        console.log(resource)
        let resp = "HTTP/1.1 ";
        let statusCode, statusMsg, body;
        let headers = `Date: ${new Date().toUTCString()}
                        Server: sHTTP/1.1
                        Content-Type: ${contentType}
                        `;

        switch(method.toLowerCase()) {
            case 'get':
                fs.readFile(resource, (err, data) => {
                    if(err) {
                        console.log(err)
                        statusCode = 404;
                        statusMsg = "Not Found";
                        body = "Not found!"
                        resp += statusCode + " " + statusMsg + "\r\n" + headers + "\r\n\r\n" + body;
                        callback(resp, resp);
                    }else {
                        statusCode = 200;
                        statusMsg = "OK";
                        body = data;
                        console.log(body.toString())
                        resp += statusCode + " " + statusMsg + "\r\n" + headers + "\r\n\r\n" + body;
                        callback(null, resp);
                    }
                })
                break;
            default:
                statusCode = 501;
                statusMsg = "Not Implemented";
                body = "Method not yet implemented";
                resp += statusCode + " " + statusMsg + "\r\n" + headers + "\r\n\r\n" + body;
                callback(resp, resp);
        }
    }
    
}

const server = new sHTTP(8080);