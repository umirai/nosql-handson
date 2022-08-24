import { FastifyInstance, RouteOptions, FastifyRequest, FastifyReply } from 'fastify'

async function routes(fastify: FastifyInstance, opts: RouteOptions) {
  const { db } = fastify

  fastify.get('/users', async function (_, reply: FastifyReply) {
    const querySnapshot = await db.collection('users').get()
    const users = querySnapshot.docs.map(doc => doc.data())
    reply.send(users)
  })

  fastify.get('/users/:userId', async function (request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as any
    const querySnapshot = await db.collection('users').doc(userId).get()
    const user = querySnapshot.data()
    reply.send(user)
  })
}

export default routes
