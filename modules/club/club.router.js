const clubRouter = require("express").Router();
const { isSuperAdmin, checkLogin, isMember } = require("../../middlewares/auth.middleware");
const clubCtrl = require('./club.controller');

clubRouter.post('/register', clubCtrl.registerClub);
clubRouter.get('/', clubCtrl.getAllClubs);
clubRouter.get('/:id', clubCtrl.getSingleClub);
clubRouter.patch('/:id', checkLogin(), isSuperAdmin, clubCtrl.updateClub);
clubRouter.delete('/:id', checkLogin(), isSuperAdmin, clubCtrl.deleteClub);
clubRouter.post('/:id/join', checkLogin(), isMember, clubCtrl.joinClub);
clubRouter.post('/leave', checkLogin(), isMember, clubCtrl.leaveClub);


module.exports = clubRouter;