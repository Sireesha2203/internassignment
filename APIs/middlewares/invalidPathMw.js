const errHandlingMW=(err,req,res,next)=>{
    res.send({message:({message:err.message})})
}
module.exports=errHandlingMW