const fastify = require('fastify');

const app = fastify({
    logger: true,
});

app.register(require('./src/root'));

const start = async () => {
    try {
        await app.listen({ port: process.env.PORT || 3000 });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}


start().catch(err => console.log(err));
