import { FastifyInstance, RouteOptions } from 'fastify'

async function routes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', function (request, reply) {
    reply.send('Hello World!' + process.env.NODE_ENV)
  })
}

export default routes
