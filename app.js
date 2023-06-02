'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyRedis = require('@fastify/redis');
const fastify = require('fastify')();
const fastifyCors = require('@fastify/cors');

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {}

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(fastifyRedis, {
    host: process.env.REDIS_HOST
  });

  await fastify.register(fastifyCors, {
    origin: (origin, cb) => {
      if (origin !== undefined) {
        const { hostname } = new URL(origin);
        if (process.env.CORS_ENABLED.split(',').includes(hostname)) {
          cb(null, true);
          return;
        }
        // Generate an error on other origins, disabling access
        cb(new Error('Not allowed'), false);
      } else {
        cb(null, true);
      }
    },
    credentials: true,
  });


  fastify.addHook('onRequest', (request, reply, done) => {
    request.page_no = parseInt(process.env.PAGE_NO);
    request.no_of_records = parseInt(process.env.NO_OF_RECORDS);
    done();
  });

  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;
    const replyJson = {
      statusCode,
      msg: error.message ? error.message : request.locales.INTERNAL_SERVER_ERROR,
      data: {},
      error: [],
    };
    if (error.statusCode === 400) replyJson.msg = request.locales.VALIDATION_ERROR;
    fastify.log.error(error);
    replyJson.error.push(error);
    reply.status(statusCode).send(replyJson);
  });



  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })


  fastify.addHook('onRequest', (request, reply, done) => {
    request.locales = require(path.join(__dirname, './Locales/en.json'));;
    done();
  });



}

const PORT = process.env.PORT || 3000


fastify.listen({
  port: PORT,
  host: '0.0.0.0',
}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
