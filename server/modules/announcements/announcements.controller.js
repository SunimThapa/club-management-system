const announcementSvc = require('./announcements.service')

class AnnouncementController{

    async createAnnouncement(req, res, next){
        try{
            const data = await announcementSvc.createAnnouncement(req);
            res.json({
                data: data,
                message: "Announcement Created Successfully",
                Status: "ANNOUNCEMENT_CREATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getAllAnnouncements(req, res,next){
        try{
            const data = await announcementSvc.getAllAnnouncements();
            res.json({
                data: data,
                message: "Announcements Fetched Successfully",
                Status: "ANNOUNCEMENTS_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getSingleAnnouncement(req, res, next){
        try{
            const data = await announcementSvc.getSingleAnnouncement(req);
            res.json({
                data: data,
                message: "Announcement Fetched Successfully",
                Status: "ANNOUNCEMENT_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async updateAnnouncement(req, res, next){
        try{
            const data = await announcementSvc.updateAnnouncement(req);
            res.json({
                data: data,
                message: "Announcement Updated Successfully",
                Status: "ANNOUNCEMENT_UPDATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async deleteAnnouncement(req, res, next){
        try{
            const data = await announcementSvc.deleteAnnouncement(req);
            res.json({
                data: data,
                message: "Announcement Deleted Successfully",
                Status: "ANNOUNCEMENT_DELETED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }
}

const announcementCtrl = new AnnouncementController();
module.exports = announcementCtrl;