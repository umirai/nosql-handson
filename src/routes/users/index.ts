import { FastifyInstance, RouteOptions, FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '@/infra/userRepository'

async function routes(fastify: FastifyInstance, opts: RouteOptions) {
  const { db } = fastify

  fastify.get('/users', async function (_, reply: FastifyReply) {
    const userRepository = new UserRepository(db)
    const users = await userRepository.index()
    reply.send(users)
  })

  fastify.get('/users/:userId', async function (request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as any
    const userRepository = new UserRepository(db)
    const user = await userRepository.findById(userId)
    reply.send(user)
  })
}

export default routes
