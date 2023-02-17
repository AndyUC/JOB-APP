const User = require('../model/Userschema');
const {StatusCodes}= require('http-status-codes')
const jwt = require('jsonwebtoken');
const BadrequestError = require('../errors/badrequest');
const UnauthenticatedError = require('../errors/unauthenticated');

const register = async (req,res) =>{

        const user = await User.create({...req.body}); 
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({user:{username:user.username},token})
        
}

const login = async (req,res) => {
    const {username, password} = req.body;
    if(!username||!password){
        throw new BadrequestError('please insert username and password')
    }
    const user = await User.findOne({username});
    if(!user){
        throw new UnauthenticatedError(`Invalid credentials`)
    }
    const ispasswordMatch = await user.comparePassword(password)
    if(!ispasswordMatch){
        throw new UnauthenticatedError(`Invalid credentials`)
    }
    const token =user.createJWT();
    res.status(StatusCodes.OK).json({user:{name:username},token});
}

module.exports= {login,register}
