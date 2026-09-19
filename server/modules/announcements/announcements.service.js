const announcementModel = require('./announcements.model')

class AnnouncementService{

    async createAnnouncement(req){
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        if (!data.title || !data.message){
            throw {
                code: 400,
                message: "title and message are required",
                status: "VALIDATION_ERROR"
            };
        }

        try{
            const announcementId = await announcementModel.create({
                title: data.title,
                message: data.message,
                created_by: loggedInUser.user_id
            });
            return announcementId;
        }catch(exception){
            throw exception;
        }
    }

    async getAllAnnouncements(){
        try{
            const announcements = await announcementModel.findAll();
            return announcements;
        }catch(exception){
            throw exception;
        }
    }

    async getSingleAnnouncement(req){
        const { id } = req.params;
        try{
            const announcement = await announcementModel.findById(id);
            if (!announcement){
                throw {
                    code: 404,
                    message: "Announcement not found",
                    status: "ANNOUNCEMENT_NOT_FOUND"
                };
            }
            return announcement;
        }catch(exception){
            throw exception;
        }
    }

    async updateAnnouncement(req){
        const { id } = req.params;
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        try{
            const announcement = await announcementModel.findById(id);
            if (!announcement){
                throw {
                    code: 404,
                    message: "Announcement not found",
                    status: "ANNOUNCEMENT_NOT_FOUND"
                };
            }

            if (announcement.created_by !== loggedInUser.user_id){
                throw {
                    code: 403,
                    message: "You are not allowed to update this announcement",
                    status: "ACCESS_DENIED"
                };
            }

            const updatedData = {
                title: data.title || announcement.title,
                message: data.message || announcement.message
            };

            await announcementModel.update(id, updatedData);
            const updated = await announcementModel.findById(id);
            return updated;
        }catch(exception){
            throw exception;
        }
    }

    async deleteAnnouncement(req){
        const { id } = req.params;
        const loggedInUser = req.loggedInUser;

        try{
            const announcement = await announcementModel.findById(id);
            if (!announcement){
                throw {
                    code: 404,
                    message: "Announcement not found",
                    status: "ANNOUNCEMENT_NOT_FOUND"
                };
            }

            if (announcement.created_by !== loggedInUser.user_id){
                throw {
                    code: 403,
                    message: "You are not allowed to delete this announcement",
                    status: "ACCESS_DENIED"
                };
            }

            await announcementModel.remove(id);
            return { announcement_id: id };
        }catch(exception){
            throw exception;
        }
    }
}

const announcementSvc = new AnnouncementService();
module.exports = announcementSvc;