class PropertyService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    findOne(propertyId, userId) {
        return this.prisma.property.findFirst({
            where: {
                id: parseInt(propertyId),
                userId,
            },
        });
    }

    find(options) {
        return this.prisma.property.findMany({
            where: options,
            orderBy: {
                id: 'desc',
            },
        });
    }

    create(propertyData, userId) {
        return this.prisma.property.create({
            data: {
                ...this.prepareData(propertyData),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
    }

    update(propertyId, propertyData) {
        return this.prisma.property.update({
            where: {
                id: parseInt(propertyId),
            },
            data: this.prepareData(propertyData),
        });
    }

    delete(propertyId) {
        return this.prisma.property.delete({
            where: {
                id: parseInt(propertyId),
            },
        });
    }

    prepareData(propertyData) {
        return {
            title: propertyData.title,
            description: propertyData.description,
            price: propertyData.price,
            approximateMonthlyRentPrice: propertyData.approximateMonthlyRentPrice,
        };
    }
}

module.exports = { PropertyService };
