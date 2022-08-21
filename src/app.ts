import Fastify from 'fastify'
import logConfig from '@/configs/log'
import env from '@/plugins/env'
import firebase from '@/plugins/firebase'
import homeRoute from '@/routes/home'
import userRoute from '@/routes/users'

(async () => {
  // instance
  const fastify = Fastify({ logger: logConfig });

  // plugins
  fastify.register(env)
  fastify.register(firebase)

  // routes
  fastify.register(homeRoute)
  fastify.register(userRoute)

  // server
  fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
      fastify.log.error(err.message)
      process.exit(1)
    }
  })
})();
