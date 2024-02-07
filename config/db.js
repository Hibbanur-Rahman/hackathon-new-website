const mongoose = require("mongoose");

module.exports.dbConnection = (url) => {
  mongoose.connect(url);

  const db = mongoose.connection;
  db.on("error", (error) => {
    console.error("MongoDB connection error:", error);
  });

  db.once("open", () => {
    console.log("MongoDB connected SuccessFully!!");
  });
};
