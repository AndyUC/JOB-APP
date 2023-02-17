const express = require('express')
const jobRouter = express.Router();
const {getalljobs,createjobs,getjob,updatejob,deletejob}= require('../controler/job')
jobRouter.route('/').post(createjobs).get(getalljobs)
jobRouter.route('/:id').get(getjob).delete(deletejob).patch(updatejob)
module.exports = jobRouter;