const fp = require('fastify-plugin');
const { UserService } = require('./user/user-service');
const passwordEncryptor = require('./common/password-encryptor');


module.exports = async function (app) {
    /**
     * Infrastructure plugins
     */
    app.register(require('./db'));
    app.register(require('@fastify/auth'))
    app.register(require('@fastify/cors'), {
        origin: '*',
    });

    /**
     * Global dependencies
     */
    app.register(fp(async function (app) {
        app.decorate('passwordEncryptor', passwordEncryptor);
        app.decorate('userService', new UserService(app.prisma, app.passwordEncryptor));
    }));

    /**
     * Request decorators
     */
    app.decorateRequest('user', null)

    /**
     * API Plugins
     */
    app.register(require('./auth'));
    app.register(require('./user'));
    app.register(require('./property'));


}
