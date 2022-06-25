const propertyRoutes = require('./property-routes');
const { PropertyService } = require('./property-service');

module.exports = async function (app) {
    app.decorate('propertyService', new PropertyService(app.prisma));

    app.register(propertyRoutes);
};
