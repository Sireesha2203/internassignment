const exp=require("express")
const userApp=exp.Router()

const expressAsyncHandler=require("express-async-handler")

userApp.get('/get-users',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //get users from db
    await userCollectionObj.find().toArray()
    .then((userList)=>{
        res.status(200).send({message:"Userlist",payload:userList});
    })
    .catch((err)=>console.log(err))
}))
userApp.get('/get-users-1',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //get Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes” from db.
    await userCollectionObj.find({income:{$lt:"$5.00"},car:{$in:["BMW","Mercedes-Benz"]}}).toArray()
    .then((userList)=>{
        res.status(200).send({message:"Userlist",payload:userList});
    })
    .catch((err)=>console.log(err))
}))
userApp.get('/get-users-2',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //get Male Users which have phone price greater than 10,000 from db
    await userCollectionObj.find({gender:"Male",$expr: { $gte: [{ $strLenCP: "$phone_price" }, 5] }}).toArray()
    .then((userList)=>{
        res.status(200).send({message:"Userlist",payload:userList});
    })
    .catch((err)=>console.log(err))
}))
userApp.get('/get-users-3',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //get Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name from db
    await userCollectionObj.find({last_name:{ $regex: /^M/ }},{$expr:{$gt:[{$strLenCP:"$quote"},15]}},{email:{ $regex: /^.*<last_name>.*@.*$/i }}).toArray()
    .then((userList)=>{
        res.status(200).send({message:"Userlist",payload:userList});
    })
    .catch((err)=>console.log(err))
}))
userApp.get('/get-users-4',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //get Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
    await userCollectionObj.find({car: { $in: ["BMW", "Mercedes-Benz", "Audi"] },email: { $not: /\d/ }}).toArray()
    .then((userList)=>{
        res.status(200).send({message:"Userlist",payload:userList});
    })
    .catch((err)=>console.log(err))
}))
userApp.get('/get-users-5',expressAsyncHandler(async(req,res)=>{
    //get userCollectionObj
    const userCollectionObj=req.app.get("userCollectionObj");
    
    //Show the data of top 10 cities which have the highest number of users and their average income.
    await userCollectionObj.aggregate([
        {
          $addFields: {
            incomeNum: { $toDouble: { $substr: ["$income", 1, -1] } }
          }
        },
        {
          $group: {
            _id: "$city",
            count: { $sum: 1 },
            avgIncome: { $avg: "$incomeNum" }
          }
        },
        {
            $group:{
                _id:null,
                maxUserCount:{$max:"$count"},
                cities: { $push: { city: "$_id", count: "$count", avgIncome: "$avgIncome" } }
            }
        },
        {
          $project: {
            _id: 0,
            cities: {
              $filter: {
                input: "$cities",
                as: "city",
                cond: { $eq: ["$$city.count", "$maxUserCount"] }
              }
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        }
      ]).toArray()
      .then(async(cities)=>{
        const t=cities[0];
        const cityNames = await t.cities.map(city => city.city);
        // fetch users from the extracted city names
        await userCollectionObj.find({ city: { $in: cityNames } })
        .toArray()
        .then((users) => {
          res.status(200).send({ message: "users", userPayload: users , cityPayload:cities[0].cities});
        })
        .catch((err) => console.log(err));
        })
    .catch((err)=>console.log(err))
}))
module.exports=userApp;
