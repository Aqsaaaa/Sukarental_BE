const pool = require('../config/db');
const bcrypt = require('bcrypt');
const queries = require('../queries/queries');


// id user 2
const registerUser = async (name, email, password, phone, role_id = 2) => {
    const saltRounds = process.env.SALT_ROUNDS;
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(queries.userRegister, [name, email, hash, phone, role_id]);
        return result.rows[0];
    } catch (err) {
        throw new Error('Database query error: ' + err.message);
    }
};

const loginUser = async (email, password) => {
    try {
        const result = await pool.query(queries.userLogin, [email]);

        if (result.rows.length === 0) {
            return { user: null, isMatch: false };
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        return { user, isMatch };
    } catch (err) {
        throw new Error('Database query error: ' + err.message);
    }
};

module.exports = {
    registerUser,
    loginUser,
};

