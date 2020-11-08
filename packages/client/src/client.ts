import { BookServiceClient } from './protos/ServiceServiceClientPb'
import { GetBookRequest } from './protos/service_pb'
// https://github.com/grpc/grpc-web#typescript-support

const bookService = new BookServiceClient('http://localhost:8080', null, null)
const getBookRequest = new GetBookRequest()
getBookRequest.setIsbn(3)

bookService.getBook(getBookRequest, {}, (error, response) => {
  console.log(response.getAuthor())
  //   client.close()
})
