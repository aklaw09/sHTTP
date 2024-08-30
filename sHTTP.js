import { TcpServer } from "./TcpServer";

class sHTTP extends TcpServer {

    listen(port) {
        this.server.listen(port, () => {
            console.log("sHTTP listening on port:", port);
        })
    }
    reqHandler(data, conn) {
        console.log("sHTTP is handling this now");
        super.reqHandler(data, conn);
    }
}

const server = new sHTTP(8080);