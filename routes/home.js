const router = require('express').Router();

//controller handlers
const homeController = require('../controllers/home');

// router.get('*', checkUser);
router.get('/', homeController.home);
// router.get('/dashboard', auth, homeController.dashboard);

module.exports = router;