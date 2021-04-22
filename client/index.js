import TerminalController from "./src/terminalController.js";
import Events from 'events';
import CliConfig from "./src/cliConfig.js";

// Responsavel por chamar todos os módulos do sistema.

const [nodePath, filePath, ...commands] = process.argv;
const config = CliConfig.parseArguments(commands)
console.log('config', config)
const componentEmitter = new Events();
// const controller = new TerminalController();
// await controller.initializeTable(componentEmitter);