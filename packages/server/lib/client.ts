import io from 'socket.io-client'
import { ClientSocket, ServerSocket } from './type'

export default function (): void {
  const client1 = io('http://localhost:3000')
  const client2 = io('http://localhost:3000')
  const client3 = io('http://localhost:3000')

  client1.emit('create_room', (room_id: any) => {
    console.debug(`[client1] connect to room`)
    client1.emit('connect_room', { room_id })

    console.debug(`[client2] connect to room`)
    client2.emit('connect_room', { room_id })

    console.debug(`[client1] send change_status`)
    client1.emit('change_status', {
      room_id,
      status: { speed: 2 },
    })
  })

  client3.emit('connect_room', { room_id: 'test2' })

  client1.on('change_status', (data: any) => {
    console.debug(`[client1] receive change_status`)
  })
  client2.on('change_status', (data: any) => {
    console.debug(`[client2] receive change_status`)
  })
  client3.on('change_status', (data: any) => {
    console.debug(`[client3] receive change_status`)
  })
}
