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

module.exports.getOriginalLink = (req, res, next) => {
  const shortid = req.params.id;

  const query = UrlShortener.findById(shortid);

  query.exec().then(data => {
    return res.status(200).json(data);
  }).catch(err => {
    return res.status(404).json({ error: err, message: 'Url Shortener Not Found !'});
  });
};
