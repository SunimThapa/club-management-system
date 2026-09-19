const clubSvc = require('./club.service')

class ClubController{

    async registerClub(req, res,next){
        try{
            const data = await clubSvc.clubRegister(req);
            res.json({
                data: data,
                message: "Club Created Successfully",
                Status: "CLUB_CREATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }

    }

async getAllClubs(req, res, next){
        try{
            const data = await clubSvc.getAllClubs();
            res.json({
                data: data,
                message: "Clubs Fetched Successfully",
                Status: "CLUBS_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getSingleClub(req, res, next){
        try{
            const data = await clubSvc.getSingleClub(req);
            res.json({
                data: data,
                message: "Club Fetched Successfully",
                Status: "CLUB_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async updateClub(req, res, next){
        try{
            const data = await clubSvc.updateClub(req);
            res.json({
                data: data,
                message: "Club Updated Successfully",
                Status: "CLUB_UPDATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async deleteClub(req, res, next){
        try{
            const data = await clubSvc.deleteClub(req);
            res.json({
                data: data,
                message: "Club Deleted Successfully",
                Status: "CLUB_DELETED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }
    async joinClub(req, res){
        try{
            const data = await clubSvc.joinClub(req);
            res.json({
                data: data,
                message: "Joined Club Successfully",
                Status: "CLUB_JOINED_SUCCESSFULLY"
            })
        }catch(exception){
            throw exception;
        }
    }

    async leaveClub(req, res){
        try{
            const data = await clubSvc.leaveClub(req);
            res.json({
                data: data,
                message: "Left Club Successfully",
                Status: "CLUB_LEFT_SUCCESSFULLY"
            })
        }catch(exception){
            throw exception;
        }
    }

}

const clubCtrl= new ClubController();
module.exports = clubCtrl;