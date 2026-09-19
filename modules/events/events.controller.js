const eventSvc = require("./events.service");

class EventController {
  async registerEvent(req, res, next) {
    try {
      const userId = req.loggedInUser.user_id ;
      const clubId = req.loggedInUser.club_id ;

      const eventData = {
        title: req.body.title,
        description: req.body.description ?? null,
        venue: req.body.venue,
        event_date: req.body.event_date,
        created_by: userId,
        club_id: clubId,
      };

      const event = await eventSvc.createEvent(eventData);

      res.json({
        details: event,
        message: "Event Registered Successfully",
        status: "EVENT_REGISTERED_SUCCESSFULLY",
      });
    } catch (exception) {
      next(exception);
    }
  }
  async getAllEvents(req, res, next){
    try{
        const data = await eventSvc.getAllEvents();
        res.json({
            data: data,
            message: "Events Fetched Successfully",
            Status: "EVENTS_FETCHED_SUCCESSFULLY"
        })
    }catch(exception){
        next (exception);
    }
}
async getSingleEvent(req, res, next){
  try{
      const data = await eventSvc.getSingleEvent(req);
      res.json({
          data: data,
          message: "Event Fetched Successfully",
          Status: "EVENT_FETCHED_SUCCESSFULLY"
      })
  }catch(exception){
      next (exception);
  }
}
async updateEvent(req, res, next ){
  try{
      const data = await eventSvc.updateEvent(req);
      res.json({
          data: data,
          message: "Event Updated Successfully",
          Status: "EVENT_UPDATED_SUCCESSFULLY"
      })
  }catch(exception){
      next (exception);
  }
}
async deleteEvent(req, res){
  try{
      const data = await eventSvc.deleteEvent(req);
      res.json({
          data: data,
          message: "Event Deleted Successfully",
          Status: "EVENT_DELETED_SUCCESSFULLY"
      })
  }catch(exception){
      throw exception;
  }
}
}

const eventCtrl = new EventController();
module.exports = eventCtrl;