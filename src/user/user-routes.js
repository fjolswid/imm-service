const fastify = require('fastify');

module.exports = async function(app, options) {
    app.route({
        method: 'GET',
        url: '/user/me',
        preHandler: app.auth([
            app.verifyJwt,
        ]),
        handler: (request) => {
            return {
                user: request.user,
            }
        }
    });
}
