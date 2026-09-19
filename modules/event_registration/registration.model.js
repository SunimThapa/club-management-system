const db = require('./../../config/database')

class RegistrationModel {

    async create(data){
        const query = `
        INSERT INTO event_registrations (user_id, event_id)
        VALUES (?, ?)
        `
        const [result] = await db.execute(query, [data.user_id, data.event_id])
        return result.insertId;
    }

    async findById(registration_id){
        const query = `SELECT * FROM event_registrations WHERE registration_id = ?`
        const [rows] = await db.execute(query, [registration_id])
        return rows[0] || null;
    }

    async findByUser(user_id){
        const query = `
        SELECT r.registration_id, r.user_id, r.event_id,
               e.title, e.event_date, e.venue, e.club_id
        FROM event_registrations r
        JOIN events e ON e.event_id = r.event_id
        WHERE r.user_id = ?
        ORDER BY e.event_date DESC
        `
        const [rows] = await db.execute(query, [user_id])
        return rows;
    }

    async findByEvent(event_id){
        const query = `
        SELECT r.registration_id, r.user_id, r.event_id,
               u.name, u.email
        FROM event_registrations r
        JOIN users u ON u.user_id = r.user_id
        WHERE r.event_id = ?
        `
        const [rows] = await db.execute(query, [event_id])
        return rows;
    }

    async findByUserAndEvent(user_id, event_id){
        const query = `SELECT * FROM registrations WHERE user_id = ? AND event_id = ?`
        const [rows] = await db.execute(query, [user_id, event_id])
        return rows[0] || null;
    }
    
    async remove(registration_id){
        const query = `DELETE FROM event_registrations WHERE registration_id = ?`
        const [result] = await db.execute(query, [registration_id])
        return result.affectedRows;
    }
}

const registrationModel = new RegistrationModel();
module.exports = registrationModel;