const pool = require('../config/db');
const queries = require('../queries/queries');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const getAllUsers = async (req) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        throw new Error('Authorization token is required');
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded.role_id !== 1) {
            throw new Error('Forbidden: You do not have the right permissions');
        }

        const result = await pool.query(queries.getUsers);
        return result.rows;
    } catch (err) {
        throw new Error('Invalid token or insufficient permissions');
    }
};

const getUserById = async (id) => {
    try {
        const result = await pool.query(queries.getUserById, [id]);
        return result.rows.length ? result.rows[0] : null;
    } catch (err) {
        throw new Error('Error fetching user by ID');
    }
};

module.exports = {
    getAllUsers,
    getUserById,
};
