const fp = require('fastify-plugin');
const Ajv = require('ajv');
const ajvErrors = require('ajv-errors');
const addFormats = require('ajv-formats');
const ajvKeywords = require('ajv-keywords');

const ajv = new Ajv({ allErrors: true, $data: true });

// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async (fastify, opts) => {
    ajvErrors(ajv);
    addFormats(ajv);
    ajvKeywords(ajv);

    fastify.setValidatorCompiler((schemaDefinition) => {
        const {
            schema,
        } = schemaDefinition;
        const validate = ajv.compile(schema);
        return (data) => {
            const isValid = validate(data);
            if (!isValid) {
                throw fastify.httpErrors.badRequest(validate.errors);
            }
            return data;
        };
    });

    fastify.decorate('customValidator', (schema, data) => {
        try {
            const validate = ajv.compile(schema);
            const isValid = validate(data);
            if (!isValid) {
                throw fastify.httpErrors.badRequest(validate.errors);
            }
        } catch (err) {
            throw fastify.httpErrors.badRequest(err);
        }
    });
});
