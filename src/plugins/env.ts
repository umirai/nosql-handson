import type { FastifyInstance, FastifyPluginOptions } from 'fastify'
import fp from 'fastify-plugin'
import Env from '@fastify/env'

declare module 'fastify' {
  interface FastifyInstance {
    config: {
      NODE_ENV: string,
      DB_NAME: string,
    };
  }
}

async function env(fastify: FastifyInstance, opts: FastifyPluginOptions) {
  const schema = {
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

  fastify.register(Env, {
    dotenv: true,
    schema: schema
  })
}

export default fp(env, {
  name: 'env'
})
