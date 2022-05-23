import express from 'express'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'

export const app = express()
export const server = http.createServer(app)

const io = new Server(server, {})

app.use(express.static('public'))

/**
 * Events
 */
const FIRST_HI = 'first-hi'
const JOINED_USERS = 'joined-user'
const ONLINE_USERS = 'online-user'

io.on('connection', (socket) => {
    socket.on(FIRST_HI, (message, ackCallback) => {
        ackCallback({ status: 'OK' })

        io.emit(FIRST_HI, message)
    })

    socket.emit('first-hi', 'Server Hello')
})

app.get('/', (req, res) => {
    res.sendFile('index.html', {
        root: path.resolve('.') + '/public/html/',
    })
})

app.get('/login', (req, res) => {
    res.sendFile('login.html', {
        root: path.resolve('.') + '/public/html/',
    })
})
