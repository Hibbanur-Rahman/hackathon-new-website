const httpStatusCodes = require("../constant/httpStatusCodes");
const Status = require("../constant/statusConstant");
const Hacker = require("../models/userModel");
const { getOnlyDate } = require("../utils/helperFunctions");

const dashboard = async (req, res) => {
  try {
    const allTeams = await Hacker.find();
    const allTeamsCount = allTeams.length || 0;

    let totalHackers = 0;

    for (const team of allTeams) {
      totalHackers += team.numberOfMember;
    }

    const countByStatus = allTeams.reduce((acc, hacker) => {
      acc[hacker.status] = (acc[hacker.status] || 0) + 1;
      return acc;
    }, {});

    res.render("admin/dashboard", {
      allTeamsCount,
      verifiedTeamCount: countByStatus[Status.VERIFIED] || 0,
      pendingTeamCount: countByStatus[Status.PENDING] || 0,
      totalHackers,
    });
  } catch (error) {
    console.error("Error fetching hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await Hacker.find();

    res.render("admin/allTeams", {
      allTeams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getVerifiedTeams = async (req, res) => {
  try {
    const verifiedTeams = await Hacker.find({ status: Status.VERIFIED });

    res.render("admin/verifiedTeams", {
      verifiedTeams,
    });
  } catch (error) {
    console.error("Error fetching verified hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const getPendingTeams = async (req, res) => {
  try {
    const pendingTeams = await Hacker.find({ status: Status.PENDING });
    res.render("admin/pendingTeams", {
      pendingTeams,
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
    const teams = await Hacker.find();

    const allHackers = teams.flatMap((team) => {
      const {
        status,
        teamId,
        teamName,
        teamLeader,
        teamMembers,
        instituteName,
        domains,
      } = team;

      // Map team leaders
      const teamLeaders = [
        {
          name: teamLeader.name,
          email: teamLeader.email,
          phone: teamLeader.phone,
          instituteId: teamLeader.instituteId,
          instituteName: instituteName,
          status: status,
          teamName: teamName,
          domains: domains,
          teamId: teamId,
          type: "leader",
        },
      ];

      // Map team members
      const members = teamMembers?.map((member) => ({
        name: member.name,
        email: member.email,
        phone: member.phone,
        instituteId: member.instituteId,
        instituteName: instituteName,
        status: status,
        teamName: teamName,
        domains: domains,
        teamId: teamId,
        type: "member",
      }));

      // Concatenate team leaders and team members for this team
      return [...teamLeaders, ...members];
    });

    const uniqueEmails = {};
    const filteredHackers = allHackers.filter((item) => {
      if (!uniqueEmails[item.email]) {
        uniqueEmails[item.email] = true;
        return true;
      }
      return false;
    });

    res.render("admin/allHackers", {
      filteredHackers,
    });
  } catch (error) {
    console.error("Error fetching hackers:", error);
    res
      .status(httpStatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const verifyTeam = async (req, res) => {
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
  getAllTeams,
  getVerifiedTeams,
  getPendingTeams,
  verifyTeam,
  getHackerProfile,
  getAllHackers,
};
