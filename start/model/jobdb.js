const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
    company:{
        type: String,
        require:[true,'Please provide your Company'],
        maxlength:50
    },
    position:{
        type: String,
        require:[true,'Please provide your Position'],
        maxlength:20
    },
    status:{
        type: String,
        enum:['interviewer','declined','pending'],
        default:'pending'
    },
    createdBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        require:[true,'Please provide User']
    }
},
{timestamps:true}
)
module.exports = mongoose.model('Job',JobSchema);