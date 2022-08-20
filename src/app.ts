import Fastify from 'fastify'
import homeRoute from '@/routes/home'

const fastify = Fastify({ logger: true })

fastify.register(homeRoute)

fastify.listen({ port: 8000 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`server listening on ${address}`)
})
