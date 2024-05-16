const express = require("express");
const Router = express.Router();
const path = require("path");
const upload = require("../middleware/multerMiddleware");
const { authenticateUser, logout } = require("../middleware/authMiddleware");

const { login, register } = require("../controller/adminController");
const {
  getAllTeams,
  getVerifiedTeams,
  getPendingTeams,
  verifyTeam,
  dashboard,
  getHackerProfile,
  getAllHackers,
} = require("../controller/adminHackerController");

const {
  registerHacker,
  checkStatus,
} = require("../controller/hackerController");
const {
  checkInternalRequest,
} = require("../middleware/checkInternalRequestMiddleware");

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
Router.get("/machine-learning", (req, res) => {
  res.render("about/machineLearning");
});
Router.get("/game-development", (req, res) => {
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

Router.get("/success-page", checkInternalRequest, (req, res) => {
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

// pages
Router.get("/privacy-policy", (req, res) => {
  res.render("privacyPolicy");
});

Router.get("/terms-conditions", (req, res) => {
  res.render("termConditions");
});

// Apply the authenticateUser middleware to protect these routes
Router.get("/dashboard", authenticateUser, dashboard);
Router.get("/all-teams", authenticateUser, getAllTeams);
Router.get("/pending-teams", authenticateUser, getPendingTeams);
Router.get("/verified-teams", authenticateUser, getVerifiedTeams);
Router.get("/all-hackers", authenticateUser, getAllHackers);
Router.post("/verify-hacker", authenticateUser, verifyTeam);

Router.get("/profile/:hacker_id", authenticateUser, getHackerProfile);

// Route for downloading PDF file
Router.get("/download-brochure", (req, res) => {
  const pdfFilePath = path.join(
    __dirname,
    "../public",
    "coding-carnival-brochure.pdf"
  );
  res.download(pdfFilePath, "coding-carnival-brochure.pdf");
});

// Serve robots.txt explicitly
Router.get("/robots.txt", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "robots.txt"));
});


module.exports = Router;
