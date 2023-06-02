


const path = require('path');
const validations = require(path.join(__dirname, '../../../validations/api/v1'));
const { authController, caseController } = require(path.join(__dirname, '../../../controllers'));



module.exports = async function (fastify, opts) {

  fastify.register(authController);
  fastify.register(caseController);


// *****************LOGIN*************************************************

  fastify.route({
    method: 'POST',
    path: '/login',
    schema: {
      headers: validations.headers,
    },
    handler: async (request, reply) => {
      try {

        const isLoggIn = await fastify.authController.login(request,reply)

      } catch (err) {
        throw fastify.httpErrors.createError(err.status || 500, err.message);
      }
    },
  });
}