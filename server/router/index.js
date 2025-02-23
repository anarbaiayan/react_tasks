const Router = require('express').Router
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.put('/users/:userId/role', authMiddleware, userController.updateUserRole);
router.put("/users/:userId", authMiddleware, userController.updateUser);
router.put("/users/:userId/ban", authMiddleware, userController.updateUserBanStatus);

module.exports = router