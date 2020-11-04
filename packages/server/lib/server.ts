import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import client from './client'
import { ServerSocket } from './type'

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

const io = socketio(server)

io.on('connect', (socket: ServerSocket) => {
  socket.on('create_room', (callback) => {
    return callback({ room_id: 'test_room_id' })
  })
  socket.on('connect_room', ({ room_id }) => {
    socket.join(room_id)
  })

  socket.on('change_status', ({ room_id, status }) => {
    // console.log(`change`)
    io.to(room_id).emit('change_status', status)
  })
})

server.listen(port, () => {
  console.log('listening on *:' + port)
  client()
})
