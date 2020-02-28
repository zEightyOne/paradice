const { NotFound, ServiceUnavailable, BadRequest } = require('http-errors')
async function routes (fastify, options) {
    const db = fastify.mongo.db('paradice');
    const collection = db.collection('dice');

    const opts = {
        schema: {
            response: {
                200: {
                    type: 'object',
                    properties: {
                        goodbye: { type: 'string' }
                    }
                }
            }
        }
    }

    fastify.get('/', opts, async (request, reply) => {
        return { Status: 'OK' }
    });

    fastify.get('/dice/:id', async (request, reply) => {

        let o_id;
        try {
            o_id = new fastify.ObjectID(request.params.id);
        } catch (err) {
            throw BadRequest(err);
        }
        let result;
        try {
            result = await collection.findOne({"_id": o_id });

        } catch (err) {
            throw new ServiceUnavailable(err);
        }
        if (result === null)
            throw new NotFound(`unknown resource: ${request.params.id}`);

        reply.send(result);
    })
}

module.exports = routes;