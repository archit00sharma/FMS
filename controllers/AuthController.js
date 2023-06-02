/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');
const bcrypt = require('bcryptjs');

const { authService, userService } = require(path.join(__dirname, '../services'));

let msg = 'Success';
let statusCode = 200;
let data = {};
const error = [];

const authController = (fastify) => {
    fastify.register(authService);
    fastify.register(userService);

    const login = async (request, reply) => {
        try {
            const { email, password } = request.body

            const user = await fastify.userService.read({ email })

            if (!user) throw fastify.httpErrors.notFound(request.locales.USER_NOT_FOUND)

            const isPasswordCorrect = await bcrypt.compare(
                password.trim(),
                user.password,
            );

            if (!isPasswordCorrect) throw fastify.httpErrors.badRequest(request.locales.PASSWORD_WORNG);

            const token = await fastify.jwt.sign({ id: user.id, role: user.role });

            await fastify.redis.set(`CMB:${process.env.NODE_ENV}:loggedInUsers:${user.id}`, token);

            data = { token, role: user.role, msg: request.locales.LOGIN_SUCCESS }

            reply.status(200).send({ data, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }

    return { login };

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('authController', authController(fastify));
    next();
});
