const db = require('./../../config/database')
const bcrypt = require("bcryptjs")
const userModel = require("./user.model")

class UserService {
    async transformUserData(req){
        const data = req.body;
        data.password = bcrypt.hashSync(data.password, 12);
        return data;
    
    }
async userRegister(data){
    try{
        const [result] = await db.query(
            `INSERT INTO users (name, email, password, role)
            VALUES (?, ?, ?, ?)`,
            [data.name, data.email, data.password, data.role]
        );
        
         return {
            id: result.insertId,
            name: data.name,
            email: data.email,
            role: data.role,
        };;
    }
    catch(exception){
        throw exception;
    }
}

async getSingleRowByFilter (filter){
   try{
    const keys = Object.keys(filter);
    if (keys.length === 0) return null;

    const searchKey = keys[0]; 
    const searchValue = filter[searchKey];

    const query = `SELECT * FROM users WHERE ${searchKey} = ? LIMIT 1`;
    const [rows] = await db.execute(query, [searchValue]);

    return rows.length > 0 ? rows[0] : null;

   }catch(exception){
    throw exception
   }

  }
  getUserPublicProfile (user){
    // const [result]= await db.query(
    //     `SELECT user_id, name, email, password, role, club_id FROM users WHERE email = ?`,
    //     [filter.email]
    // );
    // return result[0];
    return{
        name:user.name,
        email: user.email,
        user_id: user.user_id,
        role: user.role,
        club_id: user.club_id,
    }

}
 async updateUserByFilter(updateData, filterObject){
    try{
        const result = await userModel.updateUserData("users", updateData, filterObject)
        return result;
    }catch(exception){
        throw exception;
    }
 }
 async getMyProfile(req){
    return req.loggedInUser;
}

async updateMyProfile(req){
    const data = req.body;
    const loggedInUser = req.loggedInUser;

    const updateData = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;
    if (data.password) updateData.password = bcrypt.hashSync(data.password, 12);

    if (Object.keys(updateData).length === 0){
        throw {
            code: 400,
            message: "At least one field (name, email, password) is required",
            status: "VALIDATION_ERROR"
        };
    }

    try{
        await this.updateUserByFilter(updateData, { user_id: loggedInUser.user_id });
        const updatedUser = await this.getSingleRowByFilter({ user_id: loggedInUser.user_id });
        return this.getUserPublicProfile(updatedUser);
    }catch(exception){
        throw exception;
    }
}

async getAllUsers(){
    try{
        const users = await userModel.findAll();
        return users;
    }catch(exception){
        throw exception;
    }
}

async getSingleUser(req){
    const { id } = req.params;
    try{
        const user = await userModel.findByIdSafe(id);
        if (!user){
            throw {
                code: 404,
                message: "User not found",
                status: "USER_NOT_FOUND"
            };
        }
        return user;
    }catch(exception){
        throw exception;
    }
}

async deleteUser(req){
    const { id } = req.params;
    try{
        const user = await userModel.findByIdSafe(id);
        if (!user){
            throw {
                code: 404,
                message: "User not found",
                status: "USER_NOT_FOUND"
            };
        }

        await userModel.remove(id);
        return { user_id: id };
    }catch(exception){
        throw exception;
    }
}

}
const userSvc = new UserService();
module.exports = userSvc;