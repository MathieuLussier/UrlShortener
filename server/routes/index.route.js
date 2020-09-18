const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index/index.controller');

const urlChecker = require('../middlewares/urlChecker');

router.post('/shortener/create', urlChecker.checkOriginalLink, indexController.shortener.createShortLink);
router.get('/shortener/get/:id', indexController.shortener.getOriginalLink);

module.exports = router;
