const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index/index.controller');

router.post('/shortener/create', indexController.shortener.createShortLink);

module.exports = router;
