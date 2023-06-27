/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');
const bcrypt = require('bcryptjs');

const { areaService } = require(path.join(__dirname, '../services'));

let msg = 'Success';
let statusCode = 200;
let data = {};
const error = [];

const areaController = (fastify) => {

    fastify.register(areaService);

    const getAllAreas = async (request, reply) => {
        try {
            const { page_no, no_of_records, query: { search, role = 'manager' } } = request;

            const [areas] = await fastify.areaService.all(page_no, no_of_records, search, { role })

            const total_records = areas?.total_records?.[0]?.count ?? 0;

            const { data: areasData } = areas || {};

            reply.status(200).send({ data: { total_records, page_no, no_of_records, areas: areasData || [] }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const createArea = async (request, reply) => {
        try {
            request.body.created_by = request.area.id

            if (!request.body.permissions) request.body.permissions = {
                read: { members: ["no_permission"], case: ["no_permission"] },
                write: { members: ["no_permission"], case: ["no_permission"] }
            }

            const area = await fastify.areaService.create(request.body);

            reply.status(200).send({ data: { area }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const getAreaById = async (request, reply) => {
        try {
            const area = await fastify.areaService.read({ id: request.params.id })

            reply.status(200).send({ data: { area: area || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const updateAreaById = async (request, reply) => {
        try {

            const area = await fastify.areaService.update(request.params.id, request.body);

            reply.status(200).send({ data: { area: area || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }

    const deleteAreaById = async (request, reply) => {
        try {
            const area = await fastify.areaService.update(request.params.id, { is_deleted: true, is_active: false })

            reply.status(200).send({ data: { area: area || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }



    return { getAllAreas, createArea, getAreaById, updateAreaById, deleteAreaById };

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('areaController', areaController(fastify));
    next();
});
