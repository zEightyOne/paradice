const { Accepted, ServiceUnavailable, BadRequest } = require('http-errors');
async function postRoutes (fastify, options) {
    const db = fastify.mongo.db('paradice');
    const collection = db.collection('dice');

    const opts = {
        schema: {
                body: {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "sides": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "patternProperties": {
                                    "^.*$": {
                                        "type": "integer"
                                    }
                                },
                                "additionalProperties": false
                            }
                        }
                    }
                }
        }
    };

    fastify.post('/dice', opts, async (request, reply) => {
        let body = request.body;
        let result;
            try {
            result = await collection.insertOne(request.body);
            console.log(result);
            reply.code(201);
        } catch (err) {
            throw new ServiceUnavailable(err);
        }
        reply.send({id: result.insertedId.toString() });
    })
}

module.exports = postRoutes;