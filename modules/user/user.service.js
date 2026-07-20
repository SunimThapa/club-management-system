const db = require('./../../config/database')
const bcrypt = require("bcryptjs")

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
    catch(err){
console.log(err)
    }
}
}
const userSvc = new UserService();
module.exports = userSvc;