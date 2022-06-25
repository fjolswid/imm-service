const { use } = require('bcrypt/promises');

class PropertyService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    findOne(propertyId, userId) {
        return this.prisma.property.findUnique({
            where: {
                id: parseInt(propertyId),
                userId,
            },
        });
    }

    find(options) {
        return this.prisma.property.findMany({
            where: options,
        });
    }

    create(propertyData, userId) {
        return this.prisma.property.create({
            data: {
                ...propertyData,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    update(propertyId, propertyData, userId) {
        return this.prisma.property({
            where: {
                id: propertyId,
                userId,
            },
            data: {
                propertyData,
            },
        });
    }
}

module.exports = { PropertyService };
