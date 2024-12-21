const userModel = require('../models/userModel');
const getUsers = async (req, res) => {
    try {
        const users = await userModel.getAllUsers(req);
        res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Error fetching users'
        });
    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await userModel.getUserById(id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message || 'Error fetching user'
        });
    }
};

module.exports = {
    getUsers,
    getUserById,
};
