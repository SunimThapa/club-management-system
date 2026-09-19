const registrationRouter = require("express").Router();
const { checkLogin } = require("../../middlewares/auth.middleware");
const registrationCtrl = require('./registration.controller');

registrationRouter.post('/:event_id', checkLogin(), registrationCtrl.registerForEvent);
registrationRouter.get('/myRegistration', checkLogin(), registrationCtrl.getMyRegistrations);
registrationRouter.get('/event/:event_id', checkLogin(), registrationCtrl.getEventRegistrations);
registrationRouter.delete('/:id', checkLogin(), registrationCtrl.cancelRegistration);

module.exports = registrationRouter;