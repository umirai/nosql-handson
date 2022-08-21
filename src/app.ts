import Fastify from 'fastify'
import env from '@/plugins/env'
import firebase from '@/plugins/firebase'
import homeRoute from '@/routes/home'

(async () => {
  // instance
  const fastify = Fastify({ logger: true });

  // plugins
  await fastify.register(env)
  await fastify.register(firebase)

  // routes
  await fastify.register(homeRoute)

  // server
  void fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
      fastify.log.error(err.message)
      process.exit(1)
    }
  })
})();
