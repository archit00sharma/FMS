/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');
const bcrypt = require('bcryptjs');

const { bankService } = require(path.join(__dirname, '../services'));

let msg = 'Success';
let statusCode = 200;
let data = {};
const error = [];

const userController = (fastify) => {

    fastify.register(userService);

    const getAllBanks = async (request, reply) => {
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

    const createBank = async (request, reply) => {
        try {
            request.body.created_by = request.user.id

            if (!request.body.permissions) request.body.permissions = {
                read: { members: ["no_permission"], case: ["no_permission"] },
                write: { members: ["no_permission"], case: ["no_permission"] }
            }

            const bank = await fastify.userService.create(request.body);

            reply.status(200).send({ data: { bank }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const getBankById = async (request, reply) => {
        try {
            const bank = await fastify.userService.read({ id: request.params.id })

            reply.status(200).send({ data: { bank: bank || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const updateBankById = async (request, reply) => {
        try {

            const bank = await fastify.userService.update(request.params.id, request.body);

            reply.status(200).send({ data: { bank: bank || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }

    const deleteBankById = async (request, reply) => {
        try {
            const bank = await fastify.userService.update(request.params.id, { is_deleted: true, is_active: false })

            reply.status(200).send({ data: { bank: bank || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }



    return { getAllBanks, createBank, getBankById, updateBankById, deleteBankById };

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('userController', userController(fastify));
    next();
});
