const express = require('express')
const authrouter = express.Router();
const {login, register}= require('../controler/auth')
authrouter.post('/register',register)
authrouter.post('/login',login)
module.exports = authrouter