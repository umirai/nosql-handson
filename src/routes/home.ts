import { FastifyInstance, RouteOptions } from 'fastify'

async function routes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', function (request, reply) {
    reply.send('Hello World!')
  })
}

export default routes
