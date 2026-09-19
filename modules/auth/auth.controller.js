const userSvc = require("../user/user.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {AppConfig} = require("../../config/config")

class AuthController {
  registerUser = async (req, res, next) => {
    try{
        const data = await userSvc.transformUserData(req);
        console.log(data);
        const user = await userSvc.userRegister(data);
        res.json({
          data: user,
          message: "User Registered Successfully",
          status: "USER_REGISTERED",
          option: null,
        });
    }catch(exception){
        next(exception);
    }
   
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const userInfo = await userSvc.getSingleRowByFilter({
        email: email,
      });
      if (!userInfo) {
        throw {
            code: 422,
          message: "User not registered yet",
          status: "USER_NOT_REGISTERED",
        };
      }
      if (!bcrypt.compareSync(password, userInfo.password)) {
        throw {
          code: 422,
          message: "Credentials do not match",
          status: "CREDENTIALS_DO_NOT_MATCH",
        };
      }
      console.log("Checking secret key:", AppConfig?.jwtSecret);
      const accessToken = jwt.sign({
        sub: userInfo.user_id,
        type: "Bearer"
      }, AppConfig.jwtSecret, {expiresIn: "3hr"})
      res.json({
        data: {
          accessToken : accessToken
        },
        message: "You have logged in successfully",
        status: "LOGIN_SUCCESS",
        option: null,
      });
    } catch (exception) {
      next(exception)
    }
  };
  logout = (req, res, next) => {
    try{
        res.json({
            data: null,
            message: "Logged Out Successfully",
            Status: "LOGOUT_SUCCESSFUL"
        })
    }catch(exception){
        next (exception);
    }
}
}
const authCtrl = new AuthController();
module.exports = authCtrl;
