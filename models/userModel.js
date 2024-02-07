const mongoose = require("mongoose");
const Status = require("../constant/statusConstant");

const HackerSchema = new mongoose.Schema(
  {
    teamId: {
      type: String,
      required: true,
      unique: true,
    },
    teamName: {
      type: String,
      required: true,
      unique: true,
    },
    instituteName: {
      type: String,
      required: true,
    },
    instituteAddress: {
      type: String,
      required: true,
    },
    numberOfMember: {
      type: Number,
      required: true,
    },
    upiNumber: {
      type: String,
      required: true,
      unique: true,
    },
    transactionImage: {
      type: String,
      required: true,
      unique: true,
    },
    teamLeader: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
      },
      instituteId: {
        type: String,
        required: true,
        unique: true,
      },
    },
    teamMembers: [
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        phone: {
          type: String,
        },
        instituteId: {
          type: String,
        },
      },
    ],

    domains: {
      type: String,
      required: true,
    },
    toolName: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: Status.PENDING,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hacker", HackerSchema);
