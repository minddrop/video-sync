import {
  Server,
  ServerCredentials,
  ServerUnaryCall,
  sendUnaryData,
  ServerWritableStream,
  ServerReadableStream,
  ServerDuplexStream,
} from 'grpc'
import {
  BookServiceService,
  IBookServiceServer,
} from './protos/service_grpc_pb'
import { GetBookRequest, Book, GetBookViaAuthor } from './protos/service_pb'
import client from './client'

const server: Server = new Server()
class BookServiceServer implements IBookServiceServer {
  getBook(
    call: ServerUnaryCall<GetBookRequest>,
    callback: sendUnaryData<Book>
  ) {
    const { request } = call
    const req = request.getIsbn()
    console.log('req:', req)

    const book = new Book()
    book.setAuthor('e')
    callback(null, book)
  }

  getBooksViaAuthor(call: ServerWritableStream<GetBookViaAuthor>) {
    const { request } = call
    const req = request.getAuthor()
    console.log('req:', req)

    for (let step = 0; step < 5; step++) {
      console.log('in loop')

      const res = new Book()
      res.setAuthor('svvdjj')
      call.write(res)
    }

    call.end()
  }

  getGreatestBook(
    call: ServerReadableStream<GetBookRequest>,
    callback: sendUnaryData<Book>
  ) {
    call.on('data', (get_book_request: GetBookRequest) => {
      console.log(get_book_request.getIsbn())
    })

    call.on('end', () => {
      const book = new Book()
      book.setAuthor('e')
      callback(null, book)
    })
  }

  getBooks(call: ServerDuplexStream<GetBookViaAuthor, Book>) {
    call.on('data', (get_book_request: GetBookRequest) => {
      console.log(get_book_request.getIsbn())
      const res = new Book()
      res.setIsbn(23423)
      call.write(res)
    })
    call.on('end', () => {
      call.end()
    })
  }
}

const port = process.env.PORT || 50051

server.addService(BookServiceService, new BookServiceServer())

server.bind(`localhost:${port}`, ServerCredentials.createInsecure())
console.log('[start]')
server.start()
client()
