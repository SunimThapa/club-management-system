const db = require('./../../config/database')
class UserService {
async userRegister(data){
    console.log(data);
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
            role: data.role
        };;
    }
    catch(err){
console.log(err)
    }
}
}
const userSvc = new UserService();
module.exports = userSvc;