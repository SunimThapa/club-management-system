const authRouter = require('express').Router();
const authCtrl = require('./auth.controller');

authRouter.post('/auth/register', authCtrl.registerUser);

module.exports = authRouter;