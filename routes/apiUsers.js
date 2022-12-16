const express = require('express');
const router = express.Router();
const contoller = require('../controllers/apiUserController');

router.post('/register', contoller.registerAPIUser)
router.post('/token', contoller.generateAccessToken)

module.exports = router;