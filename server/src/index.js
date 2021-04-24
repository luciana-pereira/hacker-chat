import SocketServer from './socket';
import Events from 'events'

const eventEmitter = new Events();
const port = process.env.PORT || 9898;
const socketServer = new SocketServer({ port });
const server  = socketServer.initialize(eventEmitter);