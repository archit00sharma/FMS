/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');
const bcrypt = require('bcryptjs');

const { userService } = require(path.join(__dirname, '../services'));

let msg = 'Success';
let statusCode = 200;
let data = {};
const error = [];

const userController = (fastify) => {

    fastify.register(userService);

    const getAllUsers = async (request, reply) => {
        try {

            const { page_no, no_of_records, query: { search, role = 'manager' } } = request;

            const [users] = await fastify.userService.all(page_no, no_of_records, search, { role })

            const total_records = users?.total_records?.[0]?.count ?? 0;

            const { data: usersData } = users || {};

            reply.status(200).send({ data: { total_records, page_no, no_of_records, users: usersData || [] }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const createUser = async (request, reply) => {
        try {
            request.body.created_by = "6479573e8ccc31c0bedd1980";

            if (!request.body.permissions) request.body.permissions = {
                read: { members: ["no_permission"], case: ["no_permission"] },
                write: { members: ["no_permission"], case: ["no_permission"] }
            }

            const user = await fastify.userService.create(request.body);

            reply.status(200).send({ data: { user }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const getUserById = async (request, reply) => {
        try {

            const user = await fastify.userService.read({ id: request.params.id })

            reply.status(200).send({ data: { user: user || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const updateUserById = async (request, reply) => {
        try {
            // await fastify.authVerify()

            const user = await fastify.userService.update(request.params.id, request.body);

            reply.status(200).send({ data: { user: user || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }

    const deleteUserById = async (request, reply) => {
        try {
            const user = await fastify.userService.update(request.params.id, { is_deleted: true, is_active: false })

            reply.status(200).send({ data: { user: user || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }



    return { getAllUsers, createUser, getUserById, updateUserById, deleteUserById };

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('userController', userController(fastify));
    next();
});
