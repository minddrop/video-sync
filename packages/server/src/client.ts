import { callError, credentials } from 'grpc'
import { BookServiceClient } from './protos/service_grpc_pb'
import { GetBookRequest, Book, GetBookViaAuthor } from './protos/service_pb'

export default async function main(): Promise<void> {
  const client = new BookServiceClient(
    'localhost:50051',
    credentials.createInsecure()
  )
  {
    const req = new GetBookRequest()
    req.setIsbn(234)
    client.getBook(req, (err, response) => {
      console.log('Author:', response.getAuthor())
    })
  }

  {
    const req = new GetBookViaAuthor()
    req.setAuthor('vuv')
    const call = client.getBooksViaAuthor(req)
    call.on('data', (book: Book) => {
      console.log(book.getAuthor())
    })
    call.on('end', () => {
      return
    })
    // call.on('error')
    // call.on('status')
  }

  {
    const call = client.getGreatestBook((err, response) => {
      console.log('Author3:', response.getAuthor())
    })
    for (let step = 0; step < 5; step++) {
      console.log('in loop2')

      const req = new GetBookRequest()
      req.setIsbn(234)
      call.write(req)
    }
    call.end()
  }

  {
    const call = client.getBooks()
    call.on('data', (book: Book) => {
      console.log('Author:', book.getAuthor())
      const ret = new GetBookRequest()
      ret.setIsbn(234)
    })
  }
}
