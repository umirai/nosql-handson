import Fastify from 'fastify'
import env from '@/plugins/env'
import homeRoute from '@/routes/home'

(async () => {
  // instance
  const fastify = Fastify({ logger: true });

  // plugins
  void fastify.register(env)

  // routes
  void fastify.register(homeRoute)

  // server
  void fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
      fastify.log.error(err.message)
      process.exit(1)
    }
  })
})();
