import express from 'express'
import http from 'http'
import socketio from 'socket.io'
import client from './client'
import { ServerSocket } from './type'

const port = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)

const io = socketio(server)

io.on('connect', (socket: ServerSocket<socketio.Socket>) => {
  socket.on('create_room', (callback) => {
    return callback({ room_id: `ROOM-${Date.now()}` })
  })

  socket.on('join_room', ({ room_id }) => {
    socket.join(room_id, () => {
      ;(io.to(room_id) as ServerSocket<socketio.Namespace>).emit(
        'update_room',
        { num_user: socket.adapter.rooms[room_id].length }
      )
    })
  })
  socket.on('leave_room', ({ room_id }) => {
    if (!(room_id in socket.rooms)) {
      return
    }
    socket.leave(room_id, () => {
      if (!socket.adapter.rooms[room_id].length) {
        return
      }
      io.to(room_id).emit('update_room', {
        num_user: socket.adapter.rooms[room_id].length,
      })
    })
  })
  socket.on('disconnecting', () => {
    for (const room_id in socket.rooms) {
      if (!socket.adapter.rooms[room_id]?.length) {
        return
      }
      io.to(room_id).emit('update_room', {
        num_user: socket.adapter.rooms[room_id].length - 1,
      })
    }
  })

  socket.on('update_video_status', ({ room_id, status }) => {
    if (!(room_id in socket.rooms)) {
      return
    }
    io.to(room_id).emit('update_video_status', status)
  })

  socket.on('chat_message', ({ room_id, user_name, message }) => {
    if (!(room_id in socket.rooms)) {
      return
    }
    io.to(room_id).emit('chat_message', { room_id, user_name, message })
  })
})

server.listen(port, () => {
  console.log('listening on *:' + port)
  // client()
})
