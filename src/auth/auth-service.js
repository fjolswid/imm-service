class AuthService {
    /**
     *
     * @param {UserService} userService
     */
    constructor(userService) {
        this.userService = userService;
    }

    async login({ email, password }) {
        const user = await this.userService.getByEmail(email);

        if(!user) {
            return this.throwLoginInvalidCredentialsError();
        }

        const isPasswordsMatch = await this.userService.checkPassword(password, user.password);

        if(!isPasswordsMatch) {
            return this.throwLoginInvalidCredentialsError();
        }

        return { user };
    }

    async register(userData) {
        const customerExist = await this.userService.isExistsByEmail(userData.email);

        if (customerExist) {
            throw new Error('User with this email already exists');
        }

        return await this.userService.create(userData);
    }

    throwLoginInvalidCredentialsError() {
        throw new Error('Invalid email or password.');
    }
}

module.exports = {
    AuthService,
};
