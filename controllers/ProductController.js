/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');
const bcrypt = require('bcryptjs');

const { productService } = require(path.join(__dirname, '../services'));

let msg = 'Success';
let statusCode = 200;
let data = {};
const error = [];

const productController = (fastify) => {

    fastify.register(productService);

    const getAllProducts = async (request, reply) => {
        try {
            const { page_no, no_of_records, query: { search, role = 'manager' } } = request;

            const [products] = await fastify.productService.all(page_no, no_of_records, search, { role })

            const total_records = products?.total_records?.[0]?.count ?? 0;

            const { data: productsData } = products || {};

            reply.status(200).send({ data: { total_records, page_no, no_of_records, products: productsData || [] }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const createProduct = async (request, reply) => {
        try {
            request.body.created_by = request.user.id

            if (!request.body.permissions) request.body.permissions = {
                read: { members: ["no_permission"], case: ["no_permission"] },
                write: { members: ["no_permission"], case: ["no_permission"] }
            }

            const product = await fastify.productService.create(request.body);

            reply.status(200).send({ data: { product }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const getProductById = async (request, reply) => {
        try {
            const product = await fastify.productService.read({ id: request.params.id })

            reply.status(200).send({ data: { product: product || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    };

    const updateProductById = async (request, reply) => {
        try {

            const product = await fastify.productService.update(request.params.id, request.body);

            reply.status(200).send({ data: { product: product || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }

    const deleteProductById = async (request, reply) => {
        try {
            const product = await fastify.productService.update(request.params.id, { is_deleted: true, is_active: false })

            reply.status(200).send({ data: { product: product || {} }, statusCode, error })

        } catch (err) {
            throw fastify.httpErrors.createError(err.status || 500, err.message);
        }

    }



    return { getAllProducts, createProduct, getProductById, updateProductById, deleteProductById };

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('productController', productController(fastify));
    next();
});
