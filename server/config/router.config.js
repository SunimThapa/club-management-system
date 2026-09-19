const router = require("express").Router();

const authRouter = require('../modules/auth/auth.router')
const clubRouter = require('../modules/club/club.router')
const userRouter = require('../modules/user/user.router')
const eventRouter = require('../modules/events/events.router')
const registrationRouter = require("../modules/event_registration/registration.router")
const eventAttendanceRouter = require("../modules/event_attendance/attendance.router")
const announcementRouter = require("../modules/announcements/announcements.router")

router.use('/auth', authRouter);
router.use('/club', clubRouter);
router.use('/user', userRouter);
router.use('/event', eventRouter);
router.use('/event_registration', registrationRouter);
router.use('/event-attendance', eventAttendanceRouter);
router.use('/announcements', announcementRouter);


module.exports = router;