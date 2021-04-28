import ComponentsBuilder from "./components.js";
import { constants } from "./constants.js";

// Responsabilidade de receber as regras de négocio
export default class TerminalController {
    #usersCollors = new Map()
    constructor () {}

    #pickCollor() {
        return `#${((1 << 24) * Math.random() | 0).toString(16)}-fg`
    }
    #getUserCollor(userName) {
        if(this.#usersCollors.has(userName)) 
            return this.#usersCollors.get(userName)

        const collor = this.#pickCollor()
        this.#usersCollors.set(userName, collor)

        return collor
    }

    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue();
            eventEmitter.emit(constants.events.app.MESSAGE_SENT, message)
            this.clearValue()
        }
    }
    #onMessageReceived({ screen, chat }) {
        return msg => {
            const { userName, message } = msg
            const collor = this.#getUserCollor(userName)
            chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`)
            screen.render()
        }
    }
    #onLogChanged({ screen, activityLog}) {
        return msg => {
            const [userName] = msg.split(/\s/)
            const collor = this.#getUserCollor(userName)
            activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`)
            screen.render()
        }
    }
    #onStatusChanged({ screen, status}) {
        return users => {
            const {content} = status.items.shift()
            status.clearItems()
            status.addItem(content)

            users.forEach(userName => {
                const collor = this.#getUserCollor(userName)
                status.addItem(`{${collor}}{bold}${userName}{/}`)
            });
            screen.render()
        }
    }
    #registerEvents(eventEmitter, components) {
        eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components))
        eventEmitter.on(constants.events.app.ACTIVITTLOG_UPDATE,  this.#onLogChanged(components))
        eventEmitter.on(constants.events.app.STATUS_UPDATE, this.#onStatusChanged(components))
    }
   async initializeTable(eventEmitter) {
       const components = new ComponentsBuilder()
       .setScreen({ title: 'HackerChat - Luciana Pereira'})
       .setLayoutComponent()
       .setInputComponent(this.#onInputReceived(eventEmitter))
       .setChatComponent()
       .setActivityLogComponent()
       .setStatusComponent()
       .build()

        this.#registerEvents(eventEmitter, components)
       components.input.focus()
       components.screen.render()

      // setInterval(() => {
        //   const users = ['lupereira']
      //  eventEmitter.emit(constants.events.app.STATUS_UPDATE, users)
     //   users.push('italop')
     //   eventEmitter.emit(constants.events.app.STATUS_UPDATE, users)
     //   users.push('edgarpeccoli', 'troll001')
     //   eventEmitter.emit(constants.events.app.STATUS_UPDATE, users)
     //   users.push('mariabea', '001abc')
     //   eventEmitter.emit(constants.events.app.STATUS_UPDATE, users)
      // }, 1000);
   }
}