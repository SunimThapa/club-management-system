const attendanceModel = require('./attendance.model')
const eventModel = require('../events/events.model')
const registrationModel = require('../event_registration/registration.model')

const VALID_STATUSES = ["present", "absent"];

class AttendanceService{

    async markAttendance(req){
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        if (!data.event_id || !data.user_id || !data.status){
            throw {
                code: 400,
                message: "event_id, user_id and status are required",
                status: "VALIDATION_ERROR"
            };
        }

        if (!VALID_STATUSES.includes(data.status)){
            throw {
                code: 400,
                message: "status must be either 'present' or 'absent'",
                status: "VALIDATION_ERROR"
            };
        }

        try{
            const event = await eventModel.findById(data.event_id);
            if (!event){
                throw {
                    code: 404,
                    message: "Event not found",
                    status: "EVENT_NOT_FOUND"
                };
            }

            if (event.club_id !== loggedInUser.club_id){
                throw {
                    code: 403,
                    message: "You are not allowed to mark attendance for this event",
                    status: "ACCESS_DENIED"
                };
            }

            const registration = await registrationModel.findByUserAndEvent(data.user_id, data.event_id);
            if (!registration){
                throw {
                    code: 400,
                    message: "User is not registered for this event",
                    status: "NOT_REGISTERED"
                };
            }

            const attendanceId = await attendanceModel.create({
                event_id: data.event_id,
                user_id: data.user_id,
                status: data.status
            });
            return attendanceId;
        }catch(exception){
            throw exception;
        }
    }
    async bulkMarkAttendance(req){
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        if (!data.event_id || !Array.isArray(data.attendees) || data.attendees.length === 0){
            throw {
                code: 400,
                message: "event_id and a non-empty attendees array are required",
                status: "VALIDATION_ERROR"
            };
        }

        const event = await eventModel.findById(data.event_id);
        if (!event){
            throw {
                code: 404,
                message: "Event not found",
                status: "EVENT_NOT_FOUND"
            };
        }

        if (event.club_id !== loggedInUser.club_id){
            throw {
                code: 403,
                message: "You are not allowed to mark attendance for this event",
                status: "ACCESS_DENIED"
            };
        }

        const inserted = [];
        const failed = [];

        for (const attendee of data.attendees){
            try{
                if (!attendee.user_id || !attendee.status){
                    throw {
                        message: "user_id and status are required",
                        status: "VALIDATION_ERROR"
                    };
                }

                if (!VALID_STATUSES.includes(attendee.status)){
                    throw {
                        message: "status must be either 'present' or 'absent'",
                        status: "VALIDATION_ERROR"
                    };
                }

                const registration = await registrationModel.findByUserAndEvent(attendee.user_id, data.event_id);
                if (!registration){
                    throw {
                        message: "User is not registered for this event",
                        status: "NOT_REGISTERED"
                    };
                }

                const attendanceId = await attendanceModel.create({
                    event_id: data.event_id,
                    user_id: attendee.user_id,
                    status: attendee.status
                });

                inserted.push({ user_id: attendee.user_id, attendance_id: attendanceId });

            }catch(exception){
                let reason = exception.message || "Failed to mark attendance";
                if (exception.code === "ER_DUP_ENTRY"){
                    reason = "Attendance already marked for this user";
                }
                failed.push({ user_id: attendee.user_id, reason: reason });
            }
        }

        return { inserted, failed };
    }

    async updateAttendance(req){
        const { id } = req.params;
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        if (!data.status || !VALID_STATUSES.includes(data.status)){
            throw {
                code: 400,
                message: "status must be either 'present' or 'absent'",
                status: "VALIDATION_ERROR"
            };
        }

        try{
            const attendance = await attendanceModel.findById(id);
            if (!attendance){
                throw {
                    code: 404,
                    message: "Attendance record not found",
                    status: "ATTENDANCE_NOT_FOUND"
                };
            }

            const event = await eventModel.findById(attendance.event_id);
            if (event.club_id !== loggedInUser.club_id){
                throw {
                    code: 403,
                    message: "You are not allowed to update this attendance record",
                    status: "ACCESS_DENIED"
                };
            }

            await attendanceModel.updateStatus(id, data.status);
            const updated = await attendanceModel.findById(id);
            return updated;
        }catch(exception){
            throw exception;
        }
    }

    async getEventAttendance(req){
        const { event_id } = req.params;
        const loggedInUser = req.loggedInUser;

        try{
            const event = await eventModel.findById(event_id);
            if (!event){
                throw {
                    code: 404,
                    message: "Event not found",
                    status: "EVENT_NOT_FOUND"
                };
            }

            if (event.club_id !== loggedInUser.club_id){
                throw {
                    code: 403,
                    message: "You are not allowed to view attendance for this event",
                    status: "ACCESS_DENIED"
                };
            }

            const records = await attendanceModel.findByEvent(event_id);
            return records;
        }catch(exception){
            throw exception;
        }
    }

    async getMyAttendance(req){
        const loggedInUser = req.loggedInUser;
        try{
            const records = await attendanceModel.findByUser(loggedInUser.user_id);
            return records;
        }catch(exception){
            throw exception;
        }
    }
}

const attendanceSvc = new AttendanceService();
module.exports = attendanceSvc;