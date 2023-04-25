const exp =require("express")

const app=exp()

app.use(function(req,res,next){
    res.header("Access-control-Allow-origin","*")
    res.header("Access-control-Allow-Headers","origin,x-Requested-with,content-Type,Accept");
    next();
})

app.listen(3500,()=>console.log("server listening in port 3500.."))

app.use(exp.json());

const userAPP=require("./APIs/userAPP")
app.use("/user-api",userAPP);

const errHandlingMW=require("./APIs/middlewares/errHandlingMw")
app.use(errHandlingMW);

const invalidPathMW=require("./APIs/middlewares/invalidPathMw")
app.use("*",invalidPathMW);

//get mongoclient
const mclient =require("mongodb").MongoClient;

//connect to db serber using many clents
mclient.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.1")
.then((dbRef)=>{
    //connect to a dbdata
    const dbObj=dbRef.db("test")
    const userCollectionObj=dbObj.collection("userCollection")
    //show collections to API's
    app.set('userCollectionObj',userCollectionObj)
    console.log("DB is connected successfully")   
})
.catch((err)=>console.log("data connect error:",err))






