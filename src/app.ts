import Fastify from 'fastify'
import Env from '@fastify/env'
import homeRoute from '@/routes/home'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: string,
      DB_NAME: string,
    };
  }
}

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
        'DB_NAME'
      ],
      properties: {
        NODE_ENV: { type: 'string' },
        DB_NAME: { type: 'string' },
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
