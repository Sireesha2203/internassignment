const invalidPathMW=(req,res,next)=>{
    res.send({message:"Invalid Path"})
}
module.exports=invalidPathMW;