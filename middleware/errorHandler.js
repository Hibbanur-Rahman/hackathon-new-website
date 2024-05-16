// errorHandler.js

// Not found handler middleware
const notFoundHandler = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
};

// General error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("500", { pageTitle: "Internal Server Error" });
};

module.exports = { notFoundHandler, errorHandler };
