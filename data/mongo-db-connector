const fastifyPlugin = require('fastify-plugin');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

async function dbConnector (fastify, options) {
    const url = options.url;
    delete options.url;

    const client = await MongoClient.connect(url, options);
    fastify.decorate('mongo', client);
    //Need this type from Mongo client since we are using that as our external ID
    fastify.decorate('ObjectID', ObjectID);
}

// Wrapping a plugin function with fastify-plugin exposes the decorators,
// hooks, and middlewares declared inside the plugin to the parent scope.
module.exports = fastifyPlugin(dbConnector);