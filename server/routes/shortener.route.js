const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index/index.controller');

const urlChecker = require('../middlewares/urlChecker');

router.get('/:id', indexController.shortener.redirectToOriginalLink);
router.post('/api/shortener/create', urlChecker.checkOriginalLink, indexController.shortener.createShortLink);

module.exports = router;
