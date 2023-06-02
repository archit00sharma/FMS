const fp = require('fastify-plugin');

const authService = (fastify) => {



    return {};
};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('authService', authService(fastify));
    next();
});
