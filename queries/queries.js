
//ALL USERS
const getUsers = ` SELECT u.user_id, u.name, u.email, u.phone, r.role_id, r.role_name FROM users u JOIN roles r ON u.role_id = r.role_id;`
const getUserById = `SELECT * FROM users WHERE user_id = $1;`
//LOGIN REGISTER
const userRegister = `INSERT INTO users (name, email, password, phone, role_id) VALUES ($1, $2, $3, $4, $5);`
const userLogin = `SELECT user_id, name, email, phone, password, role_id FROM users WHERE email = $1;`;
const updateUser = `UPDATE users SET user_id = $1, name = $2, email = $3, phone = $4, password = $5 WHERE user_id = $1;`;


module.exports = {
    getUsers,
    getUserById,
    userRegister,
    userLogin,
    updateUser,
};