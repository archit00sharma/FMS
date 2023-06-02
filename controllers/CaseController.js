/* eslint-disable import/no-extraneous-dependencies */
const fp = require('fastify-plugin');
const path = require('path');

const { caseService} = require(path.join(__dirname, '../services'));

const caseController = (fastify) => {
    fastify.register(caseService);
    




    return {};

};

module.exports = fp((fastify, options, next) => {
    fastify.decorate('caseController', caseController(fastify));
    next();
});
