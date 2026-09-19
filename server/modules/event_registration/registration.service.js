const registrationModel = require('./registration.model')
const eventModel = require('../events/events.model')

class RegistrationService{

    async registerForEvent(req){
        const data = req.params;
        const loggedInUser = req.loggedInUser;

        if (!data.event_id){
            throw {
                code: 400,
                message: "event_id is required",
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

            const registrationId = await registrationModel.create({
                user_id: loggedInUser.user_id,
                event_id: data.event_id
            });
            return registrationId;
        }catch(exception){
            throw exception;
        }
    }
    

    async getMyRegistrations(req){
        const loggedInUser = req.loggedInUser;
        console.log(loggedInUser.user_id);
        try{
            const registrations = await registrationModel.findByUser(loggedInUser.user_id);
            return registrations;
        }catch(exception){
            throw exception;
        }
    }

    async getEventRegistrations(req){
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
                    message: "You are not allowed to view registrations for this event",
                    status: "ACCESS_DENIED"
                };
            }

            const registrations = await registrationModel.findByEvent(event_id);
            return registrations;
        }catch(exception){
            throw exception;
        }
    }

    async cancelRegistration(req){
        const { id } = req.params;
        const loggedInUser = req.loggedInUser;

        try{
            const registration = await registrationModel.findById(id);
            if (!registration){
                throw {
                    code: 404,
                    message: "Registration not found",
                    status: "REGISTRATION_NOT_FOUND"
                };
            }

            const isOwner = registration.user_id === loggedInUser.user_id;
            let isClubAdminOfEvent = false;

            if (loggedInUser.role === "club_admin"){
                const event = await eventModel.findById(registration.event_id);
                isClubAdminOfEvent = event && event.club_id === loggedInUser.club_id;
            }

            if (!isOwner && !isClubAdminOfEvent){
                throw {
                    code: 403,
                    message: "You are not allowed to cancel this registration",
                    status: "ACCESS_DENIED"
                };
            }

            await registrationModel.remove(id);
            return { registration_id: id };
        }catch(exception){
            throw exception;
        }
    }
}

const registrationSvc = new RegistrationService();
module.exports = registrationSvc;