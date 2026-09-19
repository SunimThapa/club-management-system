const db = require('./../../config/database')

class ClubModel {

    async create(data){
        const query= `
        INSERT INTO clubs (club_name, description)
        VALUES (?, ?)
        `
        const [result] = await db.execute(query, [data.club_name, data.description])
        return result.insertId;
    }
    async findAll(){
        const query = `SELECT * FROM clubs ORDER BY created_at DESC`
        const [rows] = await db.execute(query)
        return rows;
    }

    async findById(club_id){
        const query = `SELECT * FROM clubs WHERE club_id = ?`
        const [rows] = await db.execute(query, [club_id])
        return rows[0] || null;
    }

    async update(club_id, data){
        const query = `
        UPDATE clubs
        SET club_name = ?, description = ?
        WHERE club_id = ?
        `
        const [result] = await db.execute(query, [data.club_name, data.description, club_id])
        return result.affectedRows;
    }

    async remove(club_id){
        const query = `DELETE FROM clubs WHERE club_id = ?`
        const [result] = await db.execute(query, [club_id])
        return result.affectedRows;
    }
}

const clubModel = new ClubModel();
module.exports = clubModel;