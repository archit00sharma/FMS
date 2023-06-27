
const path = require('path');
const validations = require(path.join(__dirname, '../../../validations/api/v1'));
const { areaController} = require(path.join(__dirname, '../../../controllers'));



module.exports = async function (fastify, opts) {
    fastify.register(areaController);

    // *****************LOGIN*************************************************

    fastify.route({
        method: 'GET',
        path: '/areas',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);

                await fastify.areaController.getAllareas(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'POST',
        path: '/area',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {


                await fastify.authVerify(request);
                await fastify.areaController.createarea(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'GET',
        path: '/area/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.areaController.getareaById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'PUT',
        path: '/area/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.areaController.updateareaById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'DELETE',
        path: '/area/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.areaController.deleteareaById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });
}