import { Server, ServerCredentials, ServerUnaryCall, sendUnaryData } from 'grpc'
import {
  BookServiceService,
  IBookServiceServer,
} from './protos/service_grpc_pb'
import { GetBookRequest, Book } from './protos/service_pb'

const server: Server = new Server()
class BookServiceServer implements IBookServiceServer {
  getBook(
    call: ServerUnaryCall<GetBookRequest>,
    callback: sendUnaryData<Book>
  ) {
    const { request } = call
    const req = request.getIsbn()

    const book = new Book()
    book.setAuthor('e')
    callback(null, book)
  }
  getBooks() {
    return
  }
  getBooksViaAuthor() {
    return
  }
  getGreatestBook() {
    return
  }
}

const port = process.env.PORT || 50051

server.addService(BookServiceService, new BookServiceServer())

server.bind(`localhost:${port}`, ServerCredentials.createInsecure())
server.start()
