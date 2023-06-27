
const path = require('path');
const validations = require(path.join(__dirname, '../../../validations/api/v1'));
const { bankController } = require(path.join(__dirname, '../../../controllers'));



module.exports = async function (fastify, opts) {
    fastify.register(bankController);

    // *****************LOGIN*************************************************

    fastify.route({
        method: 'GET',
        path: '/banks',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);

                await fastify.bankController.getAllbanks(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'POST',
        path: '/bank',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {


                await fastify.authVerify(request);
                await fastify.bankController.createbank(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'GET',
        path: '/bank/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.bankController.getbankById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'PUT',
        path: '/bank/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.bankController.updatebankById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'DELETE',
        path: '/bank/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.bankController.deletebankById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });
}