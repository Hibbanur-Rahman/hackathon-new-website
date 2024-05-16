const Status = require("../constant/statusConstant");
const Hacker = require("../models/userModel");
const multer = require("multer");
const httpStatusCode = require("../constant/httpStatusCodes");
const { generateTeamID } = require("../utils/helperFunctions.js");

const addToEmailQueue = require("../utils/emailWorker.js");

const registerHacker = async (req, res) => {
  try {
    // Access the uploaded file information
    const paymentReceipt = req.file;

    // Check if paymentReceipt is truthy before accessing properties
    if (!paymentReceipt || !paymentReceipt.filename) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Payment receipt file is missing!",
        data: req.body,
      });
    }

    const {
      teamName,
      instituteName,
      instituteAddress,
      numberOfMember,
      upiNumber,
      transactionImage,
      groupLeaderName,
      groupLeaderEmail,
      groupLeaderContact,
      groupLeaderId,
      domains,
      toolName,
    } = req.body;

    if (
      !teamName ||
      !instituteName ||
      !instituteAddress ||
      !numberOfMember ||
      !upiNumber ||
      !paymentReceipt.filename ||
      !groupLeaderName ||
      !groupLeaderEmail ||
      !groupLeaderContact ||
      !groupLeaderId ||
      !domains ||
      !toolName
    ) {
      return res.status(httpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Some required fields are missing or incorrect.",
        data: req.body,
      });
    }

    const teamMembers = [];
    // BCC recipients
    const bccList = [];
    if (req.body.memberName) {
      for (let i = 0; i < numberOfMember - 1; i++) {
        if (Array.isArray(req.body.memberName)) {
          const member = {
            name: req.body.memberName[i],
            email: req.body.memberEmail[i],
            phone: req.body.memberContact[i],
            instituteId: req.body.memberId[i],
          };
          teamMembers.push(member);
          bccList.push(member.email);
        } else {
          const member = {
            name: req.body.memberName,
            email: req.body.memberEmail,
            phone: req.body.memberContact,
            instituteId: req.body.memberId,
          };
          teamMembers.push(member);
          bccList.push(member.email);
        }
      }
    } else {
      const member = {
        name: groupLeaderName,
        email: groupLeaderEmail,
        phone: groupLeaderContact,
        instituteId: groupLeaderId,
      };
      teamMembers.push(member);
      bccList.push(member.email);
    }

    // Check if a user with the same groupLeaderId already exists
    const existingUser = await Hacker.findOne({
      $or: [
        { "teamLeader.instituteId": req.body.groupLeaderId },
        { "teamLeader.email": req.body.groupLeaderEmail },
        { "teamLeader.phone": req.body.groupLeaderContact },
        { upiNumber: req.body.upiNumber },
      ],
    });

    if (existingUser) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message: "User with the provided data already exists.",
      });
    }

    const teamId = generateTeamID();

    const newUser = await Hacker.create({
      teamId,
      teamName,
      instituteName,
      instituteAddress,
      numberOfMember,
      upiNumber,
      transactionImage: paymentReceipt.filename,
      teamLeader: {
        name: groupLeaderName,
        email: groupLeaderEmail,
        phone: groupLeaderContact,
        instituteId: groupLeaderId,
      },
      domains,
      toolName,
      teamMembers,
    });

    console.log("bccList:- ", bccList);
    if (newUser) {
      res.status(httpStatusCode.OK).json({
        success: true,
        message: "From submitted successfully",
        newUser,
      });
      // Example data to pass to the template
      const data = {
        teamName: teamName,
        teamId: teamId,
        // Add any other data you want to pass to the template
      };

      // Add email task to the queue
      addToEmailQueue(
        "info@codingcarnival.in",
        newUser.teamLeader.email, // Use newUser.teamLeader.email instead of teamLeader.email
        "Registration Successful",
        "successMail", // This should match the name of your EJS template file without the .ejs extension
        data,
        bccList
      );
    }
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const checkStatus = async (req, res) => {
  try {
    const { teamId, mobile } = req.body;

    if (!teamId && !mobile) {
      return res
        .status(400)
        .json({ error: "Either teamId or mobile is required" });
    }

    let query;

    if (teamId) {
      query = { teamId };
    } else if (mobile) {
      query = {
        $or: [
          { "teamLeader.phone": mobile },
          { teamMembers: { $elemMatch: { phone: mobile } } },
        ],
      };
    }

    const hacker = await Hacker.findOne(query);

    if (!hacker) {
      return res.status(404).json({ status: false, error: "Hacker not found" });
    }

    const { status } = hacker;

    res.json({ status });
  } catch (error) {
    console.error("Error while checking status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerHacker,
  checkStatus,
};
