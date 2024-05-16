const checkInternalRequest = (req, res, next) => {
  if (
    !req.headers.referer ||
    !req.headers.referer.includes("localhost:5000", "codingcarnival.in")
  ) {
    res.redirect("/");
  } else {
    next();
  }
};

module.exports = { checkInternalRequest };
