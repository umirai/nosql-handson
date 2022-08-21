import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import { initializeApp, applicationDefault } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'

declare module 'fastify' {
  interface FastifyInstance {
    db: FirebaseFirestore.Firestore
  }
}

async function firebase(fastify: FastifyInstance, opts: FastifyPluginOptions) {

  const app = initializeApp({
    credential: applicationDefault(),
    databaseURL: `https://${fastify.config.DB_NAME}.firebaseio.com`
  })

  const db = getFirestore(app)

  fastify.decorate('db', db)
}

export default fp(firebase, {
  name: 'firebase'
})
