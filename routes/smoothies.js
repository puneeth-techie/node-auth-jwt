const { auth } = require('../middlewares/authCheck');
const router = require('express').Router();

//controller handlers
const smoothiesController = require('../controllers/smoothies');

router.get('/', auth, smoothiesController.smoothies);

module.exports = router;