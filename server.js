const fastify = require('fastify')({
    logger: true
});


fastify.register(require('./data/mongo-db-connector'), {
    url: 'mongodb://0.0.0.0:27017'
});

fastify.register(require('./routes/get-routes'));
fastify.register(require('./routes/post-routes'));


const start = async () => {
    try {
        await fastify.listen(3000, "::")
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();