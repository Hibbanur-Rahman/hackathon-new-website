const checkLoggedIn = (req, res, next) => {
  res.locals.loggedIn = req.session.user || false;
  next();
};
