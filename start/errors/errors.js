class CustomApiError extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode;
    }
}
const createcustomerror = (msg,statusCode)=>{
    return new CustomApiError(msg,statusCode||500);
}
module.exports = {createcustomerror,CustomApiError}