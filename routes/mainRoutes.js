const express = require("express");
const Router = express.Router();
const upload = require("../middleware/multerMiddleware");
const { authenticateUser, logout } = require("../middleware/authMiddleware");

const { login, register } = require("../controller/adminController");
const {
  getAllHackers,
  getVerifiedHackers,
  getPendingHackers,
  verifyHacker,
  dashboard,
  getHackerProfile,
} = require("../controller/adminHackerController");

const {
  registerHacker,
  checkStatus,
} = require("../controller/hackerController");

Router.get("/", (req, res) => {
  res.render("index");
});

Router.post("/register", register);

Router.get("/sponsors", (req, res) => {
  res.render("about/sponsors");
});

Router.get("/hackathon", (req, res) => {
  res.render("about/hackathon");
});
Router.get("/sponsors", (req, res) => {
  res.render("about/sponsors");
});
Router.get("/ui-ux", (req, res) => {
  res.render("about/ui-ux");
});
Router.get("/machineLearning", (req, res) => {
  res.render("about/machineLearning");
});
Router.get("/gameDevelopment", (req, res) => {
  res.render("about/gameDevelopment");
});
Router.get("/ar-vr", (req, res) => {
  res.render("about/ar-vr");
});
// coming soon page
Router.get("/registration-starts-soon", (req, res) => {
  res.render("hackers/comingSoon");
});

/** hacker registration  starts*/
Router.get("/hacker-registration", (req, res) => {
  res.render("hackers/hackerRegistration");
});

Router.post(
  "/hacker-registration",
  upload.single("transactionImage"),
  registerHacker
);

Router.get("/status", (req, res) => {
  res.render("hackers/registrationStatus");
});
Router.post("/status", checkStatus);

Router.get("/successPage", (req, res) => {
  const { teamId } = req.query;
  res.render("hackerRegistrationResponse", { teamId });
});
/** hacker registration  ends*/

/**Admin routes starts*/
Router.get("/login", (req, res) => {
  res.render("admin/login");
});


Router.post("/login", login);
Router.get("/logout", logout);



// Apply the authenticateUser middleware to protect these routes
Router.get("/dashboard", authenticateUser, dashboard);
Router.get("/all-hackers", authenticateUser, getAllHackers);
Router.get("/verified-hackers", authenticateUser, getVerifiedHackers);
Router.get("/pending-hackers", authenticateUser, getPendingHackers);
Router.post("/verifyHacker", authenticateUser, verifyHacker);

Router.get("/profile/:hacker_id", authenticateUser, getHackerProfile);

/**Admin routes ends*/

module.exports = Router;
