import { FastifyInstance, RouteOptions } from 'fastify'
import { applicationDefault, initializeApp } from 'firebase-admin/app'

async function routes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', function (request, reply) {
    const app = initializeApp({
      credential: applicationDefault(),
      databaseURL: `https://${fastify.config.DB_NAME}.firebaseio.com`
    })

    reply.send('Hello World!' + app)
  })
}

export default routes
