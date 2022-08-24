import { FastifyInstance, RouteOptions, FastifyRequest, FastifyReply } from 'fastify'

async function routes(fastify: FastifyInstance, opts: RouteOptions) {
  const { db } = fastify

  fastify.get('/users', async function (_, reply: FastifyReply) {
    const querySnapshot = await db.collection('users').get()
    const users = querySnapshot.docs.map(doc => doc.data())
    reply.send(users)
  })

  fastify.get('/users/:userId/tasks', async function (request: FastifyRequest, reply: FastifyReply) {
    const { userId } = request.params as any
    const querySnapshot = await db.collection('users').doc(userId).get()
    const user = querySnapshot.data()
    if (!user) {
      reply.status(404).send({ message: 'User not found' })
      return
    }
    reply.send(user.tasks)
  })

  fastify.put('/users/:userId/tasks/:taskId', async function (request: FastifyRequest, reply: FastifyReply) {
    const { userId, taskId } = request.params as any
    const { status } = request.body as any

    try {
      await db.runTransaction(async (transaction) => {
        const userDoc = await transaction.get(db.collection('users').doc(userId))
        const user = userDoc.data()
        if (!user) {
          reply.status(404).send({ message: 'User not found' })
          return
        }
        const tasks = user.tasks
        const index = user.tasks.findIndex((task: any) => task.id === parseInt(taskId))
        const task = user.tasks[index]
        if (!task) {
          reply.status(404).send({ message: 'Task not found' })
          return
        }
        task.status = status
        await transaction.update(db.collection('users').doc(userId), { tasks })
      })
      reply.send(true)
    } catch (e) {
      reply.status(500).send({ message: 'Failed to update task status' })
      return
    }
  })

  fastify.put('/tasks/:taskId', async function (request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as any
    const { title } = request.body as any

    try {
      await db.runTransaction(async (transaction) => {
        const querySnapshot = await transaction.get(db.collection('users'))
        querySnapshot.forEach(async (doc) => {
          const user = doc.data()
          const tasks = user.tasks
          const index = tasks.findIndex((task: any) => task.id === parseInt(taskId))
          if (!tasks[index]) {
            reply.status(404).send({ message: 'Task not found' })
            return
          }
          tasks[index].title = title
          await transaction.update(db.collection('users').doc(doc.id), { tasks })
        })
      })
      reply.send(true)
    } catch (e) {
      reply.status(500).send({ message: 'Failed to update task' })
      return
    }
  })

  fastify.delete('/tasks/:taskId', async function (request: FastifyRequest, reply: FastifyReply) {
    const { taskId } = request.params as any

    try {
      await db.runTransaction(async (transaction) => {
        const querySnapshot = await transaction.get(db.collection('users'))
        querySnapshot.forEach(async (doc) => {
          const user = doc.data()
          const tasks = user.tasks
          const index = tasks.findIndex((task: any) => task.id === parseInt(taskId))
          if (!tasks[index]) {
            reply.status(404).send({ message: 'Task not found' })
            return
          }
          tasks.splice(index, 1)
          await transaction.update(db.collection('users').doc(doc.id), { tasks })
        })
      })
      reply.send(true)
    } catch (e) {
      reply.status(500).send({ message: 'Failed to delete task' })
      return
    }
  })
}

export default routes
