import TerminalController from "./src/terminalController.js";
import Events from 'events';
import CliConfig from "./src/cliConfig.js";
import SocketClient from "./src/socket.js";

// Responsavel por chamar todos os módulos do sistema.
const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands);
const componentEmitter = new Events();
const SocketClient = new SocketClient(config);
await SocketClient.initialize();

// const controller = new TerminalController();
// await controller.initializeTable(componentEmitter);