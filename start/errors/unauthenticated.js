const { StatusCodes } = require('http-status-codes');
const { CustomApiError } = require('./errors');
class UnauthenticatedError extends CustomApiError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.UNAUTHORIZED
    }
}
module.exports = UnauthenticatedError;