const { NotFound, ServiceUnavailable, BadRequest } = require('http-errors');
async function deleteRoutes (fastify, options) {
    const db = fastify.mongo.db('paradice');
    const collection = db.collection('dice');

    const opts = {
        schema: {
            response: {
                200: {
                    "type": "object",
                    "properties": {
                        "_id": {
                            "type": "string"
                        },
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
        }
    };

    fastify.delete('/dice/:id', opts, async (request, reply) => {

        let o_id;
        try {
            o_id = new fastify.ObjectID(request.params.id);
        } catch (err) {
            throw BadRequest(err);
        }
        let result;
        try {
            result = await collection.findOneAndDelete({"_id": o_id });

        } catch (err) {
            throw new ServiceUnavailable(err);
        }
        if (result.value === null)
            throw new NotFound(`unknown resource: ${request.params.id}`);

        reply.send();
    })
}

module.exports = deleteRoutes;