const userSvc= require("./user.service")
class UserController {
    async updateUserRole(req, res, next){
        
       try{
        const userId = req.params.userId
        const { role } = req.body
        const updatedUser = await userSvc.updateUserByFilter({role: role}, {
            user_id: userId
        })
        res.json({
            data: updatedUser,
            message: "Updated User Successfully",
            status: "UPDATED_USER_SUCCESSFULLY"
        })
       }catch(exception){
        next(exception);
       }
       
      }
      async getMyProfile(req, res, next){
        try{
            const data = await userSvc.getMyProfile(req);
            res.json({
                data: data,
                message: "Profile Fetched Successfully",
                Status: "PROFILE_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async updateMyProfile(req, res, next){
        try{
            const data = await userSvc.updateMyProfile(req);
            res.json({
                data: data,
                message: "Profile Updated Successfully",
                Status: "PROFILE_UPDATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getAllUsers(req, res, next){
        try{
            const data = await userSvc.getAllUsers();
            res.json({
                data: data,
                message: "Users Fetched Successfully",
                Status: "USERS_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getSingleUser(req, res, next){
        try{
            const data = await userSvc.getSingleUser(req);
            res.json({
                data: data,
                message: "User Fetched Successfully",
                Status: "USER_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async deleteUser(req, res, next){
        try{
            const data = await userSvc.deleteUser(req);
            res.json({
                data: data,
                message: "User Deleted Successfully",
                Status: "USER_DELETED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }
      
}

const userCtrl= new UserController();
module.exports = userCtrl;