const authenticateUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

const checkLoggedIn = (req, res, next) => {
  res.locals.loggedIn = req.session.user || false;
  next();
};

module.exports = {
  authenticateUser,
  logout,
  checkLoggedIn,
};
