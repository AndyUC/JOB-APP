const { StatusCodes } = require('http-status-codes');
const { CustomApiError } = require('./errors');
class NotfoundError extends CustomApiError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.NOT_FOUND
    }
}
module.exports = NotfoundError;