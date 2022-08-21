import { FastifyReply, FastifyRequest } from 'fastify'

export default {
  transport: {
    target: 'pino-pretty'
  },
  serializers: {
    res(reply: FastifyReply) {
      return {
        statusCode: reply.statusCode
      }
    },
    req(request: FastifyRequest) {
      return {
        method: request.method,
        url: request.url,
        path: request.routerPath,
        parameters: request.params,
        headers: request.headers
      }
    }
  }
}
