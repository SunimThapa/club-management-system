const db = require("../../config/database")

class UserModel {
    async updateUserData(tableName, updateData, filterObject){
        try{
            const updateDataKey = Object.keys(updateData);
        const filterObjectKey = Object.keys(filterObject);

        const setClause = updateDataKey.map(key=> `${key} = ?`).join(",");
        const whereClause = filterObjectKey.map(key=> `${key} = ?`).join(" AND ");
        const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
        const values = [
            ...updateDataKey.map(key=> updateData[key]),
            ...filterObjectKey.map(key=> filterObject[key])
        ]
        console.log("--- DEBUGGING UPDATE ---");
        console.log("Update Data Object:", updateData);
        console.log("Filter Object:", filterObject);
        console.log("Final Values Array sent to MySQL:", values);

        const [result]= await db.execute(query, values);
        return result;

        }catch(exception){
            throw exception;
        }
    }
    async findAll(){
        const query = `SELECT user_id, name, email, role, club_id, created_at FROM users ORDER BY created_at DESC`
        const [rows] = await db.execute(query)
        return rows;
    }

    async findByIdSafe(user_id){
        const query = `SELECT user_id, name, email, role, club_id, created_at FROM users WHERE user_id = ?`
        const [rows] = await db.execute(query, [user_id])
        return rows[0] || null;
    }

    async remove(user_id){
        const query = `DELETE FROM users WHERE user_id = ?`
        const [result] = await db.execute(query, [user_id])
        return result.affectedRows;
    }
}

const userModel = new UserModel();
module.exports = userModel;