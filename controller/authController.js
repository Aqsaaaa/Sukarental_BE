const authModel = require('../models/authModel.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");
const pool = require('../config/db.js');
const queries = require('../queries/queries');



const userRegister = async (req, res) => {
    const saltRounds = 10;
    const { name, email, password, phone, role_id = 2 } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required'
        });
    }
    try {

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        });
        // const hash = await bcrypt.hash(password, saltRounds);
        // const result = await pool.query(queries.userRegister, [name, email, hash, phone, role_id]);
        // return result.rows[0];

    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Server error during registration'
        });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required'
        });
    }

    try {
        const { user, isMatch } = await authModel.loginUser(email, password);

        if (!user || !isMatch) {
            return res.status(401).json({
                status: 'error',
                message: 'Invalid credentials'
            });
        }

        const token = jwt.sign({ id: user.id, role_id: user.role_id }, JWT_SECRET);
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token: token
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Server error during login',
        });
    }
};

module.exports = {
    userRegister,
    userLogin,
};
