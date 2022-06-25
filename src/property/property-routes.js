module.exports = async function (app) {
    app.route({
        method: 'GET',
        url: '/property',
        preHandler: app.auth([
            app.verifyJwt,
        ]),
        handler: async (request, reply) => {
            const properties = await app.propertyService.find({ userId: request.user.id });


            return {
                properties,
            };
        },
    });

    app.route({
        method: 'GET',
        url: '/property/:propertyId',
        preHandler: app.auth([
            app.verifyJwt,
        ]),
        handler: async (request, reply) => {
            const { propertyId } = request.params;
            const property = await app.propertyService.findOne(propertyId, request.user.id);

            if (!property) {
                return reply
                    .code(404)
                    .send({ message: 'Property not found' });
            }

            return {
                property,
            };
        },
    });

    app.route({
        method: 'POST',
        url: '/property',
        preHandler: app.auth([
            app.verifyJwt,
        ]),
        handler: async (request, reply) => {
            const propertyData = request.body;

            const property = await app.propertyService.create(propertyData, request.user.id);

            return {
                property,
            };
        },
    });

    app.route({
        method: 'PUT',
        url: '/property/:propertyId',
        preHandler: app.auth([
            app.verifyJwt,
        ]),
        handler: async (request, reply) => {
            const { propertyId } = request.params;
            const propertyData = request.body;

            const property = await app.propertyService.findUnique(propertyId, request.user.id);

            if (!property) {
                return reply
                    .code(404)
                    .send({ message: 'Property not found' });
            }

            const updatedProperty = await app.propertyService.update(propertyId, propertyData, request.user.id);

            return {
                property: updatedProperty,
            };
        },
    });
};
