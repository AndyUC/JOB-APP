const Job = require('../model/jobdb');
const {StatusCodes} = require('http-status-codes');
const {BadrequestError, notFoundMiddleware} = require('../errors/export');
const NotfoundError = require('../errors/notfounderror');

const getalljobs = async (req,res)=>{
    req.body.createdBy = req.user.userID;
   try{ 
    const jobs = await Job.find({createdBy:req.body.createdBy}).sort('company');
    res.status(200).json({jobs})
}
   catch(error){
    res.status(500).json({msg:error})
}
}

const createjobs = async (req,res)=>{
    req.body.createdBy = req.user.userID
    try{const job = await Job.create(req.body);
    res.status(201).json({job})
} catch(error){
    res.status(500).json({msg:error})
}
}

const getjob = async (req,res)=>{
    const {id: jobid}= req.params
        const job = await Job.findOne({_id:jobid,createdBy:req.user.userID});  //
        if(!job){
            throw new NotfoundError(`No job with ID${jobid}`);
            //res.status(StatusCodes.NOT_FOUND).json({msg:'No job with this ID ${jobid}'})
        }
        res.status(201).json({job})
    }
 
 
const deletejob = async (req,res)=> {
    
        const {id: jobid}= req.params
       
        const job = await Job.findOneAndDelete({_id:jobid,createdBy:req.user.userID});
        if(!job){
          return res.status(StatusCodes.NOT_FOUND).json({msg:`No job with ID${jobid}`});
}
res.status(201).json({task: null, status: "success" } )
}

const updatejob = async (req,res)=>{
        const {id: jobid}= req.params
        const {company,position}= req.body
        if(company===""||position===""){
            throw new BadrequestError('please provide company and position')
        }
        const job = await Job.findOneAndUpdate({_id:jobid,createdBy:req.user.userID},{company,position},{new:true,runValidators:true});
        if(!job){
            return res.status(404).json({msg:`No job with ID${jobid}`})
        }
        
        res.status(200).json({id:jobid, data:req.body});
    }
    
module.exports = {getalljobs,createjobs,getjob,updatejob,deletejob} 