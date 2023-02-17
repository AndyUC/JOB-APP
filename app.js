require('dotenv').config();
require('express-async-errors');

//Extra Security Packages
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')


require('mongoose')
const express = require('express');
const app =express();
const connectdb = require('./start/data/connectdb')
const authrouter = require('./start/router/authroute')
const jobRouter = require('./start/router/jobrouter')
const {errorhandlerMiddleware,BadrequestError,CustomApiError,notFoundMiddleware,UnauthenticatedError} = require('./start/errors/export');
const authMiddleware = require('./start/middleware/authMiddleware');

app.use(express.json()); 
//Router
app.use('/auth',authrouter);
app.use('/api/v1/jobs',authMiddleware,jobRouter);
//Error
app.use(notFoundMiddleware);
app.use(errorhandlerMiddleware) 

//security
app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(rateLimiter({
    windowMS: 15*60*1000,
    max: 100,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers

 }));

const port =  3000 ||process.env.PORT
const start = async ()=>{
    try {
        await connectdb( process.env.MONGO_URI)
       app.listen(port) 
    } catch (error) {
        console.log(error)
    }
}
start()
