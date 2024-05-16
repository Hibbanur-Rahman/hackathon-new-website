// Import required modules
const dotenv = require("dotenv");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mainRoutes = require("./routes/mainRoutes");
const dbConnect = require("./config/db");
const sessionMiddleware = require("./middleware/sessionMiddleware");
const { checkLoggedIn } = require("./middleware/authMiddleware");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");
const setCurrentPath = require("./middleware/currentPathMiddleware");

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express application
const app = express();

// Connect to MongoDB using the provided connection string
const mongoDBConnection = process.env.MONGODB_URI;
dbConnect.dbConnection(mongoDBConnection);

// Set the path for serving static files (CSS, JS, images, etc.)
const publicPath = path.join(__dirname, "public");
const publicPathUploads = path.join(__dirname, "uploads");

app.use(express.static(publicPath));
app.use(express.static(publicPathUploads));

// Set EJS as the view engine for rendering dynamic content
app.set("view engine", "ejs");

// Use body-parser middleware to parse URL-encoded and JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use your sessionMiddleware for session management
app.use(sessionMiddleware);

app.use(checkLoggedIn);

// Middleware to set the current path
app.use(setCurrentPath);

// Use mainRoutes for handling routes starting from the root ("/")
app.use("/", mainRoutes);

// error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Set the port for the server, using the environment variable PORT or defaulting to 8000
const port = process.env.PORT || 8000;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`The app is running on http://localhost:${port}`);
});
