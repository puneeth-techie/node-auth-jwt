const router = require('express').Router();

//controller handlers
const authController = require('../controllers/auth');

router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/register', authController.register_get);
router.post('/register', authController.register_post);
router.get('/logout', authController.logout);

module.exports = router;