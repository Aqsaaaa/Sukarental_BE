
//ALL USERS
const getUsers = ` SELECT u.user_id, u.name, u.email, u.phone, r.role_id, r.role_name FROM users u JOIN roles r ON u.role_id = r.role_id;`
const getUserById = `SELECT * FROM users WHERE user_id = $1;`
//LOGIN REGISTER
const userRegister = `INSERT INTO users (name, email, password, phone, role_id) VALUES ($1, $2, $3, $4, $5);`
const userLogin = `SELECT user_id, name, email, phone, password, role_id FROM users WHERE email = $1;`;
const updateUser = `UPDATE users SET name = $1, email = $2, phone = $3, password = $4 WHERE user_id = $5;`;

module.exports = {
    getUsers,
    getUserById,
    userRegister,
    userLogin,
    updateUser,
};