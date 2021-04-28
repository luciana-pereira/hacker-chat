import Events from 'events';
import CliConfig from "./src/cliConfig.js";
import EventManager from './src/eventManager.js';
import SocketClient from "./src/socket.js";
import TerminalController from "./src/terminalController.js";

// Responsavel por chamar todos os módulos do sistema.
const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);

const componentEmitter = new Events();
const socketClient = new SocketClient(config);
await socketClient.initialize();
const eventManager = new EventManager({ componentEmitter, socketClient });
const data = {
    roomId: config.room,
    userName: config.username
}
eventManager.joinRoomAndWaitForMessages(data);
const controller = new TerminalController();
await controller.initializeTable(componentEmitter);