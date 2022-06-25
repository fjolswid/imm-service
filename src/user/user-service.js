class UserService {
    constructor(prisma, passwordEncryptor) {
        this.prisma = prisma;
        this.passwordEncryptor = passwordEncryptor;
    }

    async create(userData) {
        return this.prisma.user.create({
            data: {
                email: userData.email,
                name: userData.name,
                password: await this.passwordEncryptor.encrypt(userData.password),
            },
        });
    }

    checkPassword(password, hash) {
        return this.passwordEncryptor.check(password, hash);
    }

    getByEmail(email) {
        return this.prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async isExistsByEmail(email) {
        const user = await this.getByEmail(email);

        return !!user;
    }
}

module.exports = { UserService };
