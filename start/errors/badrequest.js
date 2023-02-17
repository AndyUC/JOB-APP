const { StatusCodes } = require('http-status-codes');
const { CustomApiError } = require('./errors');
class BadrequestError extends CustomApiError{
    constructor(message){
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}
module.exports = BadrequestError;