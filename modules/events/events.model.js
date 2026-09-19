const db= require("../../config/database")
class EventModel{
async create(eventData){
        try{
        
            const sql = `
                INSERT INTO events
                (
                    title,
                    description,
                    event_date,
                    venue,
                    club_id,
                    created_by
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `;
        
            const [result] = await db.execute(sql, [
                eventData.title,
                eventData.description,
                eventData.event_date,
                eventData.venue,
                eventData.club_id,
                eventData.created_by
            ]);
        
            return {
                eventId: result.insertId,
                title: eventData.title,
                description: eventData.description,
                event_date: eventData.event_date,
                venue: eventData.venue,
                club_id: eventData.club_id,
                created_by: eventData.created_by,
            };
        }catch(exception){
            throw exception;
        }
    };
    async findAll(){
        const query = `SELECT * FROM events ORDER BY event_date DESC`
        const [rows] = await db.execute(query)
        return rows;
    }
    async findById(event_id){
        const query = `SELECT * FROM events WHERE event_id = ?`
        const [rows] = await db.execute(query, [event_id])
        return rows[0] || null;
    }
    async update(event_id, data){
        const query = `
        UPDATE events
        SET title = ?, description = ?, event_date = ?, venue = ?
        WHERE event_id = ?
        `
        const [result] = await db.execute(query, [
            data.title,
            data.description,
            data.event_date,
            data.venue,
            event_id
        ])
        return result.affectedRows;
    }
    async remove(event_id){
        const query = `DELETE FROM events WHERE event_id = ?`
        const [result] = await db.execute(query, [event_id])
        return result.affectedRows;
    }

}

const eventModel = new EventModel();
module.exports = eventModel;