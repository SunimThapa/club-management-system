const registrationSvc = require('./registration.service')

class RegistrationController{

    async registerForEvent(req, res, next){
        try{
            const data = await registrationSvc.registerForEvent(req);
            res.json({
                data: data,
                message: "Registered for Event Successfully",
                Status: "REGISTRATION_CREATED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getMyRegistrations(req, res, next){
        try{
            const data = await registrationSvc.getMyRegistrations(req);
            res.json({
                data: data,
                message: "Registrations Fetched Successfully",
                Status: "REGISTRATIONS_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async getEventRegistrations(req, res, next){
        try{
            const data = await registrationSvc.getEventRegistrations(req);
            res.json({
                data: data,
                message: "Event Registrations Fetched Successfully",
                Status: "EVENT_REGISTRATIONS_FETCHED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }

    async cancelRegistration(req, res, next){
        try{
            const data = await registrationSvc.cancelRegistration(req);
            res.json({
                data: data,
                message: "Registration Cancelled Successfully",
                Status: "REGISTRATION_CANCELLED_SUCCESSFULLY"
            })
        }catch(exception){
            next (exception);
        }
    }
}

const registrationCtrl = new RegistrationController();
module.exports = registrationCtrl;