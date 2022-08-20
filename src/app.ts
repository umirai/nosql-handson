import Fastify from 'fastify'
import Env from '@fastify/env'
import homeRoute from '@/routes/home'

(async () => {
  // instance
  const fastify = Fastify({ logger: true });

  // plugins
  void fastify.register(Env, {
    dotenv: true,
    schema: {
      type: 'object',
      required: [
        'NODE_ENV',
        'SOME_ENV_VAR'
      ],
      properties: {
        NODE_ENV: { type: 'string' },
        SOME_ENV_VAR: { type: 'string' },
      }
    }
  })

  // routes
  void fastify.register(homeRoute)

  // server
  void fastify.listen({ port: 8000 }, function (err, address) {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
    console.log(process.env.NODE_ENV)
    console.log(`server listening on ${address}`)
  })
})();
