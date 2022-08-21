import Fastify from 'fastify'
import env from '@/plugins/env'
import firebase from '@/plugins/firebase'
import homeRoute from '@/routes/home'

(async () => {
  // instance
  const fastify = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty'
      },
      serializers: {
        res(reply) {
          return {
            statusCode: reply.statusCode
          }
        },
        req(request) {
          return {
            method: request.method,
            url: request.url,
            path: request.routerPath,
            parameters: request.params,
            headers: request.headers
          }
        }
      }
    }
  });

  // plugins
  fastify.register(env)
  fastify.register(firebase)

  // routes
  fastify.register(homeRoute)

  // server
  fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
      fastify.log.error(err.message)
      process.exit(1)
    }
  })
})();
