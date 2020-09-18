const urlChecker = {};

urlChecker.checkOriginalLink = (req, res, next) => {
  const originalLink = req.body.originalLink;
  const urlRegexp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/, 'gi');
  if (!urlRegexp.test(originalLink)) { return res.status(401).json({error: 'Invalid url !', message: 'Invalid url ! Please provide a valid url to be shorten.'})}
  req.body.originalLink = urlChecker.getValidUrl(originalLink);
  next();
};

urlChecker.getValidUrl = (url = "") => {
  let newUrl = decodeURIComponent(url);
  newUrl = newUrl.trim().replace(/\s/g, "");

  if(/^(:\/\/)/.test(newUrl)){
    return `http${newUrl}`;
  }
  if(!/^(f|ht)tps?:\/\//i.test(newUrl)){
    return `http://${newUrl}`;
  }

  return newUrl;
};

module.exports = urlChecker;
