const { StatusCodes } = require('http-status-codes')
const {CustomApiError} = require('./errors')
const NotfoundError = require('./notfounderror')
const errorhandlerMiddleware  = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode ||StatusCodes.INTERNAL_SERVER_ERROR,
        msg : err.message||'something wrong here'
    }
    if(err instanceof CustomApiError||err instanceof NotfoundError){
        return res.status(err.status||500).json({msg: err.message})    
}
    if(err.name==='ValidationError'){
        customError.msg = 'Please inser your ' + Object.values(err.errors).map((item)=>item.path).join(' and ');
        customError.statusCode = StatusCodes.BAD_REQUEST
    }

    if(err.code && err.code===11000){
        customError.statusCode = StatusCodes.BAD_REQUEST,
        customError.msg = 'this '+ Object.keys(err.keyValue)+ ' had created, Please try another one'
    }
    if (err.name==='CastError'){
        customError.statusCode = StatusCodes.BAD_REQUEST,
        customError.msg = 'no job with ID: '+ err.value
    }
    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports= errorhandlerMiddleware 
