const userSvc = require("./user.service");
const {checkLogin, isSuperAdmin} = require('../../middlewares/auth.middleware');
const userCtrl = require("./user.controller");
const userRouter = require("express").Router();


userRouter.patch('/:userId/assignAdmin', checkLogin(), isSuperAdmin, userCtrl.updateUserRole)
userRouter.get('/me', checkLogin(), userCtrl.getMyProfile);
userRouter.patch('/me', checkLogin(), userCtrl.updateMyProfile);
userRouter.get('/', checkLogin(), isSuperAdmin, userCtrl.getAllUsers);
userRouter.get('/:id', checkLogin(), isSuperAdmin, userCtrl.getSingleUser);
userRouter.delete('/:id', checkLogin(), isSuperAdmin, userCtrl.deleteUser);


module.exports = userRouter;