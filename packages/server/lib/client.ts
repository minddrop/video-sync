import io from 'socket.io-client'
import { ClientSocket, ServerSocket } from './type'

/* 
         | Room 1 | Room 2 | Room 3 |
Clinet A | Create |        |        |
Clinet B |  Join  |        |        |
Clinet C |  Join  | Create |        |
Clinet D |        | Join   |        |
Clinet E |        |        | Create |
*/
export default async function (): Promise<void> {
  /* 
         | Room 1 | Room 2 | Room 3 |  Null  |
Clinet A | Create |        |        |
Clinet B |  Join  |        |        |
Clinet C |  Join  | Create |        |
Clinet D |        | Join   |        |
Clinet E |        |        | Create |
Clinet F |        |        |        |  Join  |
*/
  const client_A = io('http://localhost:3000')
  const client_B = io('http://localhost:3000')
  const client_C = io('http://localhost:3000')
  const client_D = io('http://localhost:3000')
  const client_E = io('http://localhost:3000')
  const client_F = io('http://localhost:3000')

  const {
    room_id: room_1_id,
  }: { room_id: string } = await new Promise((resolve) =>
    client_A.emit('create_room', resolve)
  )
  const {
    room_id: room_2_id,
  }: { room_id: string } = await new Promise((resolve) =>
    client_C.emit('create_room', resolve)
  )
  const {
    room_id: room_3_id,
  }: { room_id: string } = await new Promise((resolve) =>
    client_E.emit('create_room', resolve)
  )

  client_A.emit('connect_room', { room_id: room_1_id })
  client_B.emit('connect_room', { room_id: room_1_id })
  client_C.emit('connect_room', { room_id: room_1_id })
  client_C.emit('connect_room', { room_id: room_2_id })
  client_D.emit('connect_room', { room_id: room_2_id })
  client_E.emit('connect_room', { room_id: room_3_id })
  client_F.emit('connect_room', { room_id: 'NULL-ROOM' }) // expected error

  /*
  1: A -> Room 1 
  2: C -> Room 1
  3: C -> Room 2
  4: D -> Room 2
  5: E -> Room 3
  6: E -> Room 1
*/
  client_A.emit('change_status', {
    room_id: room_1_id,
    status: { content: 'identifier1' },
  })
  client_C.emit('change_status', {
    room_id: room_1_id,
    status: { content: 'identifier2' },
  })
  client_C.emit('change_status', {
    room_id: room_2_id,
    status: { content: 'identifier3' },
  })
  client_D.emit('change_status', {
    room_id: room_2_id,
    status: { content: 'identifier4' },
  })
  client_E.emit('change_status', {
    room_id: room_3_id,
    status: { content: 'identifier5' },
  })
  client_E.emit('change_status', {
    room_id: room_1_id,
    status: { content: 'identifier6' },
  })

  client_A.on('change_status', (data: any) => {
    console.debug(`[client_A] receive change_status ${JSON.stringify(data)}`)
  })
  client_B.on('change_status', (data: any) => {
    console.debug(`[client_B] receive change_status ${JSON.stringify(data)}`)
  })
  client_C.on('change_status', (data: any) => {
    console.debug(`[client_C] receive change_status ${JSON.stringify(data)}`)
  })
  client_D.on('change_status', (data: any) => {
    console.debug(`[client_D] receive change_status ${JSON.stringify(data)}`)
  })
  client_E.on('change_status', (data: any) => {
    console.debug(`[client_E] receive change_status ${JSON.stringify(data)}`)
  })
  client_F.on('change_status', (data: any) => {
    console.debug(`[client_F] receive change_status ${JSON.stringify(data)}`)
  })
}
