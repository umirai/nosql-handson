import { FastifyInstance, RouteOptions } from 'fastify'
import { applicationDefault, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

async function routes(fastify: FastifyInstance, options: RouteOptions) {
  fastify.get('/', async function (request, reply) {
    const app = initializeApp({
      credential: applicationDefault(),
      databaseURL: `https://${fastify.config.DB_NAME}.firebaseio.com`
    })

    const db = getFirestore(app)
    const querySnapshot = await db.collection('users').get()
    const users = querySnapshot.docs.map(doc => doc.data())
    reply.send(users)
  })
}

export default routes
