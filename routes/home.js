const router = require('express').Router();

//controller handlers
const homeController = require('../controllers/home');

router.get('/', homeController.home);
router.get('/dashboard', homeController.dashboard);

module.exports = router;