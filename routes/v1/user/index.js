
const path = require('path');
const validations = require(path.join(__dirname, '../../../validations/api/v1'));
const { userController, caseController } = require(path.join(__dirname, '../../../controllers'));



module.exports = async function (fastify, opts) {
    fastify.register(userController);

    // *****************LOGIN*************************************************

    fastify.route({
        method: 'GET',
        path: '/users',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {

                await fastify.userController.getAllUsers(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'POST',
        path: '/user',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {

                await fastify.userController.createUser(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'GET',
        path: '/user/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {

                await fastify.userController.getUserById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'PUT',
        path: '/user/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {

                await fastify.userController.updateUserById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'DELETE',
        path: '/user/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {

                await fastify.userController.deleteUserById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });
}