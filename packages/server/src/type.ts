import SocketIO from 'socket.io'
import SocketIOClient from 'socket.io-client'
import StrictEventEmitter from 'strict-event-emitter-types'

interface Events {
  // connect: (socket: ServerSocket<SocketIO.Socket>) => void
  disconnecting: (data: any) => void
  disconnect: (data: any) => void
  create_room: (listener: (data: { room_id: string }) => void) => void

  join_room: (data: { room_id: string }) => void
  leave_room: (data: { room_id: string }) => void

  // update_room_status: (data: { room_id: string }) => void
  update_room: (data: {num_user: number}) => void
  update_video_status: (data: {
    room_id: string
    status: { [key: string]: number }
  }) => void

  chat_message: (data: {
    room_id: string
    user_name: string
    message: string
  }) => void
}
export type ServerSocket<T> = StrictEventEmitter<T, Events>
// export type ServerSocket = StrictEventEmitter<SocketIO.Socket, Events>
export type ClientSocket = StrictEventEmitter<SocketIOClient.Socket, Events>
