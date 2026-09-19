const eventModel = require("./events.model")

class EventService{

    async createEvent(eventData){
        try{
           
console.log("2. Event payload:", eventData);
            const result = await eventModel.create(eventData);
            return result;
        }catch(exception){
            throw exception;
        }
    }
    async getAllEvents(){
        try{
            const events = await eventModel.findAll();
            return events;
        }catch(exception){
            throw exception;
        }
    }
    async getSingleEvent(req){
        const { id } = req.params;
        try{
            const event = await eventModel.findById(id);
            if (!event){
                throw {
                    code: 404,
                    message: "Event not found",
                    status: "EVENT_NOT_FOUND"
                };
            }
            return event;
        }catch(exception){
            throw exception;
        }
    }
    async updateEvent(req){
        const { id } = req.params;
        const data = req.body;
        const loggedInUser = req.loggedInUser;

        try{
            const event = await eventModel.findById(id);
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
                    message: "You are not allowed to update this event",
                    status: "ACCESS_DENIED"
                };
            }

            const updatedData = {
                title: data.title || event.title,
                description: data.description || event.description,
                event_date: data.event_date || event.event_date,
                venue: data.venue || event.venue
            };

            await eventModel.update(id, updatedData);
            const updatedEvent = await eventModel.findById(id);
            return updatedEvent;
        }catch(exception){
            throw exception;
        }
    }
    async deleteEvent(req){
        const { id } = req.params;
        const loggedInUser = req.loggedInUser;

        try{
            const event = await eventModel.findById(id);
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
                    message: "You are not allowed to delete this event",
                    status: "ACCESS_DENIED"
                };
            }

            await eventModel.remove(id);
            return { event_id: id };
        }catch(exception){
            throw exception;
        }
    }


}

const eventSvc = new EventService();
module.exports = eventSvc;