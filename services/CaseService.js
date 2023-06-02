const fp = require('fastify-plugin');

const caseService = (fastify) => {



    return {};
};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('caseService', caseService(fastify));
    next();
});
