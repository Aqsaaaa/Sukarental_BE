const {Router} = require('express');
const userController = require('../controller/userController');
const loginController = require('../controller/authController');

const { authenticateToken } = require('../middlewares/authMiddleware');


const router = Router();

// user routes
router.get('/', authenticateToken,userController.getUsers);
router.get('/:id', authenticateToken,userController.getUserById);

// auth routes
router.post('/login', loginController.userLogin);
router.post('/register', loginController.userRegister);

module.exports = router;