const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index/index.controller');

router.post('/shortener/create', indexController.shortener.createShortLink);
router.get('/shortener/get/:id', indexController.shortener.getOriginalLink);

module.exports = router;
