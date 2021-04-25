export default class Controller {
    #users = new Map();

    constructor({ socketServer }) {
        this.socketServer = socketServer
    }
    onNewConnection(socket) {
        const { id } = socket
        const userData = { id, socket }
        this.#updateGlobalUserData(id, userData)

        socket.on('data')
        // socket.on('error')
        // socket.on('end')
    }

    #onSocketData(id) {}
    #updateGlobalUserData(socketId, userData) {
        const users = this.#users
        const user = users.get(socketId) ?? {}

        const updateUserData = {
            ...user,
            ...userData
        }

        users.set(socketId, updateUserData)
        return user.get(socketId)
    }
}