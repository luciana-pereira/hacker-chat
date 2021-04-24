import { rejects } from 'assert';
import http from 'http';
import { resolve } from 'path';

export default class SocketServer {
    constructor({ port }) {
        this.port = port;
    }

    async initialize(eventEmitter) {
        const server = http.createServer((req, res) => {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('hey there..')
        })

        return new Promise((resolve, rejects) => {
            server.on('error', rejects)
            server.listen(this.port, () => resolve(server))
        })
    }
}