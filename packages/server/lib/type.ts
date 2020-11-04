import SocketIO from 'socket.io'
import SocketIOClient from 'socket.io-client'
import StrictEventEmitter from 'strict-event-emitter-types'

interface Events {
  connect: (socket: ServerSocket) => void
  create_room: (listener: (data: { room_id: string }) => void) => void
  connect_room: (data: { room_id: string }) => void
  change_status: (data: {
    room_id: string
    status: { [key: string]: number }
  }) => void
}
export type ServerSocket = StrictEventEmitter<SocketIO.Socket, Events>
export type ClientSocket = StrictEventEmitter<SocketIOClient.Socket, Events>
