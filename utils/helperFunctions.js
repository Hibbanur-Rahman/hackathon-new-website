const crypto = require("crypto");

const generateRandomString = (length = 16) => {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
};

const getOnlyDate = (timestamp) => {
  const date = new Date(timestamp);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid timestamp");
  }

  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};

const generateTeamID = () => {
  const currentYear = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 20000) + 1;
  const paddedNum = String(randomNum).padStart(4, "0");
  return `MANUU-CC-${currentYear}-${paddedNum}`;
};

module.exports = { generateRandomString, generateTeamID, getOnlyDate };
