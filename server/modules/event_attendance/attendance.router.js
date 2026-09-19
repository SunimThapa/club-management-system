const attendanceRouter = require("express").Router();
const { checkLogin, isClubAdmin } = require("../../middlewares/auth.middleware");
const attendanceCtrl = require('./attendance.controller');

attendanceRouter.post('/', checkLogin(), isClubAdmin, attendanceCtrl.markAttendance);
attendanceRouter.post('/bulk', checkLogin(), isClubAdmin, attendanceCtrl.bulkMarkAttendance);
attendanceRouter.patch('/:id', checkLogin(), isClubAdmin, attendanceCtrl.updateAttendance);
attendanceRouter.get('/event/:event_id', checkLogin(), isClubAdmin, attendanceCtrl.getEventAttendance);
attendanceRouter.get('/my', checkLogin(), attendanceCtrl.getMyAttendance);

module.exports = attendanceRouter;