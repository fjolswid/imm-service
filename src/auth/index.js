const fp = require('fastify-plugin');
const authRoutes = require('./auth-routes');
const { AuthService } = require('./auth-service');
const { JwtProtocol } = require('./protocols/jwt-protocol');

module.exports = fp(async function (app, options) {
    app.decorate('authService', new AuthService(app.userService));
    app.decorate('jwtProtocol', new JwtProtocol());

    app.decorate('verifyJwt', async (request, reply) => {
        const { payload } = await app.jwtProtocol.verify({ headers: request.headers });
        request.user = payload;
    });

    app.register(authRoutes);
});
