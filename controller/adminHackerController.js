const httpStatusCodes = require("../constant/httpStatusCodes");
const Status = require("../constant/statusConstant");
const Hacker = require("../models/userModel");
const { getOnlyDate } = require("../utils/helperFunctions");

const dashboard = async (req, res) => {
  try {
    const allHackers = await Hacker.find();
    const allHackersCount = allHackers.length || 0;

    const countByStatus = allHackers.reduce((acc, hacker) => {
      acc[hacker.status] = (acc[hacker.status] || 0) + 1;
      return acc;
    }, {});

    res.render("hackers/dashboard", {
      allHackersCount,
      verifiedHackersCount: countByStatus[Status.VERIFIED] || 0,
      pendingHackersCount: countByStatus[Status.PENDING] || 0,
    });
  } catch (error) {
    console.error("Error fetching hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getAllHackers = async (req, res) => {
  try {
    const allHackers = await Hacker.find();

    res.render("hackers/allHackers", {
      allHackers,
    });
  } catch (error) {
    console.error("Error fetching hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getVerifiedHackers = async (req, res) => {
  try {
    const verifiedHackers = await Hacker.find({ status: Status.VERIFIED });

    res.render("hackers/verifiedHackers", {
      verifiedHackers,
    });
  } catch (error) {
    console.error("Error fetching verified hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getPendingHackers = async (req, res) => {
  try {
    const pendingHackers = await Hacker.find({ status: Status.PENDING });
    res.render("hackers/pendingHackers", {
      pendingHackers,
    });
  } catch (error) {
    console.error("Error fetching hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const verifyHacker = async (req, res) => {
  const userId = req.body.userId;
  const utrValue = req.body.utr;

  try {
    const hacker = await Hacker.findById(userId);

    if (hacker && hacker.upiNumber === utrValue) {
      await Hacker.findByIdAndUpdate(userId, { status: "verified" });
      res.json({ success: true, message: "UTR verification successful" });
    } else {
      res.status(400).json({ success: false, message: "Error: UTR not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getHackerProfile = async (req, res) => {
  try {
    const hackerId = req.params.hacker_id;
    const hacker = await Hacker.findById(hackerId);

    if (!hacker) {
      return res.status(404).send("Hacker not found");
    }

    const registrationDate = getOnlyDate(hacker.createdAt);

    res.render("hackers/profile", { hacker, registrationDate });
  } catch (error) {
    console.error("Error fetching hacker profile:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  dashboard,
  getAllHackers,
  getVerifiedHackers,
  getPendingHackers,
  verifyHacker,
  getHackerProfile,
};
