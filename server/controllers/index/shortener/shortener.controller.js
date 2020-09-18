const UrlShortener = require('../../../models/UrlShortener.model');

module.exports.createShortLink = (req, res, next) => {
  const originalLink = req.body.originalLink;

  const newUrlShortener = new UrlShortener({ originalLink });

  newUrlShortener.save().then(() => {
    return res.status(200).json(newUrlShortener);
  }).catch(err => {
    console.error(err);
    return res.status(500).json({ error: err, message: 'Something went wrong !'});
  });
};

module.exports.redirectToOriginalLink = (req, res, next) => {
  const shortid = req.params.id;

  const query = UrlShortener.findById(shortid);

  query.exec().then(data => {
    return res.status(302).redirect(data.originalLink);
  }).catch(err => {
    return res.status(404).send('Url Shortener Not Found !');
  });
};
