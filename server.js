const fastify = require('fastify')({
    logger: true
})

// fastify.get('/',
//     async (request, reply) =>  {
//     reply.send({hello: 'world'})
// });

fastify.register(require('./data/mongo-db-connector'), {
    url: 'mongodb://0.0.0.0:27017'
});

fastify.register(require('./routes/die-mgmt-routes'));



const start = async () => {
    try {
        await fastify.listen(3000, "::")
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();