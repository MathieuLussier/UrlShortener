const UrlShortener = require('../../../models/UrlShortener.model');

module.exports.createShortLink = (req, res, next) => {
  const originalLink = req.body.originalLink;

  const newUrlShortener = new UrlShortener({ originalLink });

  newUrlShortener.save().then(() => {
    return res.status(200).json(newUrlShortener);
  }).catch(err => {
    return res.status(500).json({ error: err, message: 'Something went wrong !'});
  });
};

