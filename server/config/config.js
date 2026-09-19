require("dotenv").config();

const AppConfig = {
  jwtSecret: process.env.JWT_SECRET,
};

module.exports = {
  AppConfig,
};
