const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middleware/index');
const router = express.Router();

router.get('/', userController.index);
router.post('/addUser', userController.addUser);
router.post('/authenticate', userController.authenticate);
router.get('/verifyToken', verifyToken, userController.validateToken);

module.exports = router; 