const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtAuthMiddleware = (req,res,next)=>{
  const auth = req.headers.authorization;
  if(!auth){
    res.status(401).json({error:"Unothorized"});
}
   try{
   const token = req.headers.authorization.split(' ')[1];
   if(!token){
    res.status(401).json({error:"Unothorized"});
   }
   const decoded =  jwt.verify(token , process.env.JWT_KEY)
            req.user = decoded
            next();
   }catch(err){
    console.log("Error in jwtMiddleware");
    res.status(505).json({error:"Error in jwtMiddleware"});
   }
}
// Generate Token 
const generateToken = (userData)=>{

     return jwt.sign(userData,process.env.JWT_KEY)
}
module.exports={
    jwtAuthMiddleware,
    generateToken
}