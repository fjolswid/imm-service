const fp = require('fastify-plugin');
const { PrismaClient } = require('@prisma/client');



module.exports = fp(async function (fastify, options, next) {
    const prisma = new PrismaClient();

    fastify.decorate('prisma', prisma);

    next();
});
