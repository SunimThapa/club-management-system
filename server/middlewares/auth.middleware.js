const { AppConfig } = require("../config/config");
const userSvc = require("../modules/user/user.service");
const jwt = require("jsonwebtoken");

const checkLogin = () => {
  return async (req, res, next) => {
    try {
      let token = req.headers["authorization"] || null;
      if (!token) {
        throw {
          code: 401,
          message: "Login First",
          status: "UNAUTHORIZED",
        };
      }
      token = token.replace("Bearer ", "");
      const payload = jwt.verify(token, AppConfig.jwtSecret);
      if (payload.type !== "Bearer") {
        throw {
          code: 401,
          message: "Invalid Token Type",
          status: "INVALID_TOKEN_TYPE",
        };
      }
      const userDetail = await userSvc.getSingleRowByFilter({
        user_id: payload.sub,
      });
      if (!userDetail) {
        throw {
          code: 403,
          message: "User already deleted or does not exist",
          status: "USER_NOT_FOUND",
        };
      }
      req.loggedInUser = userSvc.getUserPublicProfile(userDetail);
      
      next();
    } catch (exception) {
      let error = exception;

      if (exception instanceof jwt.TokenExpiredError) {
        error.code = 401;
        error.message = "Token has expired";
      } else if (exception instanceof jwt.JsonWebTokenError) {
        error.code = 401;
        error.status = "JWT_TOKEN_ERR";
        error.message = "Invalid token signature";
      }

      next(error);
    }
  };
};
const isSuperAdmin =(req, res, next)=>{
 const userDetails = req.loggedInUser;

 if (!userDetails || userDetails.role !== "super_admin") {
     throw {
         code: 403,
         message: "User Not Allowed",
         status: "Access Denied"
     };
 }
 if (!userDetails || userDetails.role !== "super_admin"){
  throw{
    code: 403,
    message: "User Not Allowed",
    Status: "Access Denied"
  }
}
next();
}
const isClubAdmin = (req, res, next)=>{
  const userDetails = req.loggedInUser;
  if (!userDetails || userDetails.role !== "club_admin"){
    throw{
      code: 403,
      message: "User Not Allowed",
      status: "Access Denied"
    }
  }
  next();
}
const isMember = (req, res, next) => {
  const userDetails = req.loggedInUser;
  if (!userDetails || userDetails.role !== "member"){
      throw {
          code: 403,
          message: "User Not Allowed",
          status: "Access Denied"
      };
  }
  next();
};

module.exports = {
  checkLogin,
  isSuperAdmin,
  isClubAdmin, 
  isMember
};
