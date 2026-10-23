const clubRouter = require("express").Router();
const { isSuperAdmin, checkLogin, isMember } = require("../../middlewares/auth.middleware");
const clubCtrl = require('./club.controller');
const userCtrl = require('../user/user.controller')

clubRouter.post('/register', checkLogin(), isSuperAdmin, clubCtrl.registerClub);
clubRouter.get('/', clubCtrl.getAllClubs);
clubRouter.get('/:id', clubCtrl.getSingleClub);
clubRouter.get('/:id/members/count', clubCtrl.getClubMemberCount);
clubRouter.get('/:id/members', checkLogin(), isSuperAdmin, userCtrl.getMembersByClub);
clubRouter.patch('/:id', checkLogin(), isSuperAdmin, clubCtrl.updateClub);
clubRouter.delete('/:id', checkLogin(), isSuperAdmin, clubCtrl.deleteClub);
clubRouter.post('/:id/join', checkLogin(), isMember, clubCtrl.joinClub);
clubRouter.post('/leave', checkLogin(), isMember, clubCtrl.leaveClub);


module.exports = clubRouter;