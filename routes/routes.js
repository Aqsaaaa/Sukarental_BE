const {Router} = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');


const router = Router();

// user routes
router.get('/', authenticateToken,userController.getUsers);
router.get('/:id', authenticateToken,userController.getUserById);

// auth routes login / register
router.post('/login', authController.userLogin);
router.post('/register', authController.userRegister);

module.exports = router;
