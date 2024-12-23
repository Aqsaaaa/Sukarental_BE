const authModel = require('../models/authModel.js');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const registerUser = async (req, res) => {
    const { name, email, password, phone, role_id } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            status: 'error',
            message: 'All fields are required'
        });
    }

    try {
        await authModel.registerUser(name, email, password, phone, role_id);
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Server error during registration'
        });
    }
};

const loginUser = async (req, res) => {
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
    registerUser,
    loginUser,
};

