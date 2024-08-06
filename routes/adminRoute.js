const express =require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin')
const { generateToken, jwtAuthMiddleware } = require('./../jwt');
router.post('/account', async(req,res)=>{
    try{
    const data = req.body;
    const salt = await bcrypt.genSalt(10)
    data.password =await bcrypt.hash(data.password , salt);
    const newAdmin = new Admin(data)
    const response = await newAdmin.save();
    const payload={
       id: data.id,
       email: data.email
    }
    const token = generateToken(payload)
    res.status(200).json({response:response,token:token})
    console.log('signup to server sucessfully')

  }catch(err){
    console.error('Internal Error', err.message); 
        return res.status(500).json({ error: 'Internal error'});
  }

})

router.post('/login', async(req,res)=>{
    try{
    const {email,password} = req.body;
    const admin =await Admin.findOne({email:email})
    if(!email){
        console.log('Sorry You cannot acess')
        res.status(500).json({message:"Invalid"})
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if(isMatch){
        const payload={
            id: admin.id,
            email:admin.email
         }
         const token = generateToken(payload)
         res.status(200).json({msg:"Sucessfully Login",token:token})
    }
    else{
        console.log('Sorry You cannot acess')
        res.status(500).json({message:"Invalid"})
    }}
    catch(err){
        console.error('Internal Error', err.message); 
        return res.status(500).json({ error: 'Internal error'});
    }
})

module.exports=router;