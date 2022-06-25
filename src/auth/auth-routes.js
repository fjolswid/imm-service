module.exports = async function (app, options) {
    app.post('/auth/login', async (request, reply) => {
        const { email, password } = request.body;

        try {
            const { user } = await app.authService.login({ email, password });

            const jwt = await app.jwtProtocol.login(user);

            return {
                jwt,
                user,
            }
        } catch (err) {
            return reply
                .code(400)
                .send({ error: err.message });
        }
    });

    app.post('/auth/register', async (request, reply) => {
        const userData = request.body;

        try {
            const user = await app.authService.register(userData);

            delete user.password;

            const jwt = app.jwtProtocol.login(user);

            return {
                jwt,
                user,
            };
        } catch (err) {
            return reply
                .status(400)
                .send({ error: err.message});
        }
    });
};
