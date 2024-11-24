const express = require('express');
const { saveFlow } = require('../controllers/emailController');
const router = express.Router();

router.post('/flow/save', saveFlow);

module.exports = router;
