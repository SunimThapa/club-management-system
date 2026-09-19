const eventRouter= require("express").Router();
const { checkLogin, isClubAdmin } = require("../../middlewares/auth.middleware");
const eventCtrl = require("./events.controller")

eventRouter.post('/createEvent', checkLogin(), isClubAdmin, eventCtrl.registerEvent);
eventRouter.get('/allEvents', eventCtrl.getAllEvents);
eventRouter.get('/:id', eventCtrl.getSingleEvent);
eventRouter.patch('/:id', checkLogin(), isClubAdmin, eventCtrl.updateEvent);
eventRouter.delete('/:id', checkLogin(), isClubAdmin, eventCtrl.deleteEvent);

module.exports = eventRouter;