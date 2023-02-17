const { StatusCodes } = require('http-status-codes');
const notFoundMiddleware = (req,res)=>{
    res.status(StatusCodes.NOT_FOUND||404).send('route does not exit')
} ;

module.exports= notFoundMiddleware 