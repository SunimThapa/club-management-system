const userSvc = require('../user/user.service')
class AuthController{
    registerUser = async (req, res) => {
        const data= req.body;
        console.log(data);
        const user = await userSvc.userRegister(data);
        
        res.json({
            data: user,
            message: "User Registered Successfully",
            status: "USER_REGISTERED",
            option: null,
        })
    }
}
const authCtrl= new AuthController();
module.exports= authCtrl;