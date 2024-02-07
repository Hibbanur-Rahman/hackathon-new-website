const httpStatusCode = require("../constant/httpStatusCodes");
const bcrypt = require("bcrypt");
const Admin = require("../models/adminModel");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Please fill in both email and password fields.",
      });
    }

    const user = await Admin.findOne({ email });

    if (!user) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(httpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Set user information in the session upon successful login
    req.session.user = {
      name: user.name,
      email: user.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong during login.",
      error: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Please fill in all the fields.",
        data: req.body,
      });
    }

    const isAdminExists = await Admin.findOne({ email }).exec();
    if (isAdminExists) {
      return res.status(httpStatusCode.CONFLICT).json({
        success: false,
        message: "Admin already exists",
      });
    }

    const admin = await Admin.create({
      name,
      email,
      password,
    });

    return res.status(httpStatusCode.OK).json({
      success: true,
      message: "User added successfully.",
      data: admin,
    });
  } catch (error) {
    return res.status(httpStatusCode.BAD_REQUEST).json({
      success: false,
      message: "Something went wrong while registering.",
      error: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
