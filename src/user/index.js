const userRoutes = require('./user-routes');
module.exports = async function (app) {

    app.register(userRoutes);
}
