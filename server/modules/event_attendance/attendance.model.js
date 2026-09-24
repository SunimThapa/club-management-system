const db = require('./../../config/database')

class AttendanceModel {

    async create(data){
        const query = `
        INSERT INTO event_attendance (event_id, user_id, status)
        VALUES (?, ?, ?)
        `
        const [result] = await db.execute(query, [data.event_id, data.user_id, data.status])
        return result.insertId;
    }

    async findById(attendance_id){
        const query = `SELECT * FROM event_attendance WHERE attendance_id = ?`
        const [rows] = await db.execute(query, [attendance_id])
        return rows[0] || null;
    }

    async findByEvent(event_id){
        const query = `
        SELECT a.attendance_id, a.event_id, a.user_id, a.status, a.marked_at,
               u.name, u.email
        FROM event_attendance a
        JOIN users u ON u.user_id = a.user_id
        WHERE a.event_id = ?
        `
        const [rows] = await db.execute(query, [event_id])
        return rows;
    }

    async findByUser(user_id){
        const query = `
        SELECT a.attendance_id, a.event_id, a.user_id, a.status, a.marked_at,
               e.title, e.event_date, e.venue
        FROM event_attendance a
        JOIN events e ON e.event_id = a.event_id
        WHERE a.user_id = ?
        ORDER BY a.marked_at DESC
        `
        const [rows] = await db.execute(query, [user_id])
        return rows;
    }

    async updateStatus(attendance_id, status){
        const query = `
        UPDATE event_attendance
        SET status = ?, marked_at = NOW()
        WHERE attendance_id = ?
        `
        const [result] = await db.execute(query, [status, attendance_id])
        return result.affectedRows;
    }
}

const attendanceModel = new AttendanceModel();
module.exports = attendanceModel;