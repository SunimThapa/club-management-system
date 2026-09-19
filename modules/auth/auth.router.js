const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');
const { checkLogin } = require('../../middlewares/auth.middleware')


authRouter.post('/register', authCtrl.registerUser);
authRouter.post('/login', authCtrl.login);
authRouter.post('/logout', checkLogin(), authCtrl.logout);

module.exports = authRouter;