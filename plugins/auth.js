const fp = require('fastify-plugin');
const fastifyJwt = require('@fastify/jwt');

module.exports = fp(async (fastify, opts) => {
    fastify.register(fastifyJwt, {
        secret: process.env.JWT_SECERET,
    });

    fastify.decorate('authVerify', async (request) => {
        try {
            const authToken = req.headers.authorization.split('Bearer ')[1]
            const user = fastify.jwt.decode(authToken);
            if (!user || !authToken) throw fastify.httpErrors.badRequest(request.locales.UNAUTHORIZED);

            const token = await fastify.redis.get(
                `CMB:${process.env.NODE_ENV}:loggedInUsers:${user.id}`,
            );
            if (!token || authToken !== token) throw fastify.httpErrors.badRequest(request.locales.UNAUTHORIZED);

            request.user = user;
        } catch (err) {
            throw fastify.httpErrors.unauthorized(err.message);
        }
    });

    // fastify.decorate('socketAuth', async (request) => {
    //     try {
    //         const user = fastify.jwt.decode(request.headers['sec-websocket-protocol'] || null);
    //         const token = await fastify.redis.get(
    //             `switch:${process.env.NODE_ENV}:loggedInUsers:${user.id}`,
    //         );
    //         if (!user || !token) throw fastify.httpErrors.badRequest(request.locales.UNAUTHORIZED);
    //         request.user = user;
    //     } catch (err) {
    //         // throw fastify.httpErrors.unauthorized(err.message);
    //     }
    // });
});
