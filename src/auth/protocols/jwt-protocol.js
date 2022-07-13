const { createSigner, createVerifier, createDecoder } = require('fast-jwt');

const BEARER = 'Bearer';

class JwtProtocol {
    constructor() {
        const key = 'secret1';
        this.signer = createSigner({
            key,
        });
        this.verifier = createVerifier({
            key,
        });
        this.decoder = createDecoder();
    }

    async login(userData) {
        const accessToken = await this.signer({
            id: userData.id,
            email: userData.email,
        });

        return {
            accessToken,
        };
    }

    async verify({ headers }) {
        const authHeader = headers['authorization'];

        if (!authHeader) {
            throw new Error('Access token is missing');
        }

        const token = authHeader.substring(BEARER.length + 1);

        const payload = await this.verifier(token);

        return {
            payload,
        };
    }
}

module.exports = { JwtProtocol };
