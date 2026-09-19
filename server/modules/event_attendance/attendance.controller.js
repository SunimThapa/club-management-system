const attendanceSvc = require('./attendance.service')

class AttendanceController{

    async markAttendance(req, res, next){
        try{
            const data = await attendanceSvc.markAttendance(req);
            res.json({
                data: data,
                message: "Attendance Marked Successfully",
                Status: "ATTENDANCE_MARKED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }
    async bulkMarkAttendance(req, res,next){
        try{
            const data = await attendanceSvc.bulkMarkAttendance(req);
            res.json({
                data: data,
                message: "Bulk Attendance Processed",
                Status: "BULK_ATTENDANCE_PROCESSED"
            })
        }catch(exception){
            next (exception);
        }
    }

    async updateAttendance(req, res){
        try{
            const data = await attendanceSvc.updateAttendance(req);
            res.json({
                data: data,
                message: "Attendance Updated Successfully",
                Status: "ATTENDANCE_UPDATED_SUCCESSFULLY"
            })
        }catch(exception){
            throw exception;
        }
    }

    async getEventAttendance(req, res){
        try{
            const data = await attendanceSvc.getEventAttendance(req);
            res.json({
                data: data,
                message: "Event Attendance Fetched Successfully",
                Status: "EVENT_ATTENDANCE_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            throw exception;
        }
    }

    async getMyAttendance(req, res){
        try{
            const data = await attendanceSvc.getMyAttendance(req);
            res.json({
                data: data,
                message: "My Attendance Fetched Successfully",
                Status: "MY_ATTENDANCE_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            throw exception;
        }
    }
}

const attendanceCtrl = new AttendanceController();
module.exports = attendanceCtrl;