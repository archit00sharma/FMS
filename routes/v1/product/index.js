
const path = require('path');
const validations = require(path.join(__dirname, '../../../validations/api/v1'));
const { productController, caseController } = require(path.join(__dirname, '../../../controllers'));



module.exports = async function (fastify, opts) {
    fastify.register(productController);

    // *****************LOGIN*************************************************

    fastify.route({
        method: 'GET',
        path: '/products',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);

                await fastify.productController.getAllproducts(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'POST',
        path: '/product',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {


                await fastify.authVerify(request);
                await fastify.productController.createproduct(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'GET',
        path: '/product/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.productController.getproductById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'PUT',
        path: '/product/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.productController.updateproductById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });

    fastify.route({
        method: 'DELETE',
        path: '/product/:id',
        schema: {
            headers: validations.headers,
        },
        handler: async (request, reply) => {
            try {
                await fastify.authVerify(request);
                await fastify.productController.deleteproductById(request, reply)

            } catch (err) {
                throw fastify.httpErrors.createError(err.status || 500, err.message);
            }
        },
    });
}