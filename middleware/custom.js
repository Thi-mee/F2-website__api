

exports.addBaseURL = (req, res, next) => {
  req.baseURL = `${req.protocol}://${req.get("host")}`;
  next();
};