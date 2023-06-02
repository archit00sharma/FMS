const fp = require('fastify-plugin');

const { PrismaClient } = require('@prisma/client');



const prisma = new PrismaClient({
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
        { level: 'query', emit: 'event' },
    ],

});

prisma.$on('info', (e) => { console.info(e); });
prisma.$on('warn', (e) => { console.warn(e); });
prisma.$on('error', (e) => {
    let errorStr = null;
    const errArr = e.message.split('\n');
    if (errArr.length) errorStr = errArr[errArr.length - 1];
    if (errorStr) {
        throw new Error(errorStr);
    } else {
        throw e;
    }
});


if (process.env.NODE_ENV !== 'production') {
    prisma.$on('query', (e) => { console.info(e); });
}


module.exports = fp(async (fastify, opts, done) => {
    await prisma.$connect();
    fastify.decorate('prisma', prisma);
    fastify.addHook('onClose', async (server) => {
        await server.prisma.$disconnect();
    });
    done();
});
