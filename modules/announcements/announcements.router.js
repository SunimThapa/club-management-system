const announcementRouter = require("express").Router();
const { checkLogin, isClubAdmin, isSuperAdmin } = require("../../middlewares/auth.middleware");
const announcementCtrl = require('./announcements.controller');

const isClubAdminOrSuperAdmin = (req, res, next) => {
    const userDetails = req.loggedInUser;
    if (!userDetails || (userDetails.role !== "club_admin" && userDetails.role !== "super_admin")){
        throw {
            code: 403,
            message: "User Not Allowed",
            status: "Access Denied"
        };
    }
    next();
};

announcementRouter.post('/', checkLogin(), isClubAdminOrSuperAdmin, announcementCtrl.createAnnouncement);
announcementRouter.get('/', announcementCtrl.getAllAnnouncements);
announcementRouter.get('/:id', announcementCtrl.getSingleAnnouncement);
announcementRouter.patch('/:id', checkLogin(), isClubAdminOrSuperAdmin, announcementCtrl.updateAnnouncement);
announcementRouter.delete('/:id', checkLogin(), isClubAdminOrSuperAdmin, announcementCtrl.deleteAnnouncement);

module.exports = announcementRouter;