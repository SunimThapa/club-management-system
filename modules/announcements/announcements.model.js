const db = require('./../../config/database')

class AnnouncementModel {

    async create(data){
        const query = `
        INSERT INTO announcements (title, message, created_by)
        VALUES (?, ?, ?)
        `
        const [result] = await db.execute(query, [data.title, data.message, data.created_by])
        return result.insertId;
    }

    async findAll(){
        const query = `SELECT * FROM announcements ORDER BY created_at DESC`
        const [rows] = await db.execute(query)
        return rows;
    }

    async findById(announcement_id){
        const query = `SELECT * FROM announcements WHERE announcement_id = ?`
        const [rows] = await db.execute(query, [announcement_id])
        return rows[0] || null;
    }

    async update(announcement_id, data){
        const query = `
        UPDATE announcements
        SET title = ?, message = ?
        WHERE announcement_id = ?
        `
        const [result] = await db.execute(query, [data.title, data.message, announcement_id])
        return result.affectedRows;
    }

    async remove(announcement_id){
        const query = `DELETE FROM announcements WHERE announcement_id = ?`
        const [result] = await db.execute(query, [announcement_id])
        return result.affectedRows;
    }
}

const announcementModel = new AnnouncementModel();
module.exports = announcementModel;