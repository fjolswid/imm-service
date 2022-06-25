const bcrypt = require('bcrypt')

module.exports = {
    /**
     * @param password
     * @return {Promise}
     */
    encrypt(password) {
        return bcrypt.hash(password, 10);
    },

    /**
     * @param password
     * @param hash
     * @return {Promise}
     */
    check(password, hash) {
        return bcrypt.compare(password, hash);
    },
};
