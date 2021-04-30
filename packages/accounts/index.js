const fastify = require('fastify')({
  logger: true,
});

const users = [
  {
    id: '1',
    name: 'one',
  },
  {
    id: '2',
    name: 'two',
  },
];

fastify.get('/users/:id', (request, reply) => {
  const id = request.params.id;
  const user = users.find((user) => user.id === id);
  if (!user) {
    reply.callNotFound();
    return;
  }
  reply.send(user);
});

fastify.listen(5000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`server listening on ${address}`);
});
