import { FastifyInstance, RouteOptions } from 'fastify'

async function routes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', async function (request, reply) {
    const querySnapshot = await fastify.db.collection('users').get()
    const users = querySnapshot.docs.map(doc => doc.data())
    reply.send(users)
  })
}

export default routes
