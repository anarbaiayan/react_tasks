const Router = require('express').Router
const router = new Router()
const userController = require('../controllers/userController')
const userTableController = require('../controllers/userTableController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.put('/users/:userId/role', authMiddleware, userController.updateUserRole);
router.put("/users/:userId", authMiddleware, userController.updateUser);
router.put("/users/:userId/ban", authMiddleware, userController.updateUserBanStatus);

router.get("/userTable", authMiddleware, userTableController.getUsers);
router.get("/userTable/:id", authMiddleware, userTableController.getUserById);
router.post("/userTable", authMiddleware, userTableController.addUser);
router.put("/userTable/:id", authMiddleware, userTableController.updateUser);
router.delete("/userTable/:id", authMiddleware, userTableController.deleteUser);

module.exports = router