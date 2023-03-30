const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const bycryt = require('bcryptjs');
const jwt = require('jsonwebtoken');




router.post('/',async(req,res ,next)=>{
    try {
        const {
            email
        }=req.body;

        if(!email) {
            return res.status(404).json({
                status:false,
                message:'please enter your email address',
            })
        };
        const existing =  await User.findOne({email});
        if(!existing) {
            return res.status(404).json({
                status:false,
                message:'wrong email address',
            })
        };
        const token = jwt.sign({
            User:existing._id,
        },
        process.env.JWY_S
        );

        //send the token 
    
         res.cookie("token",token,{
            httpOnly:true,
    
        }).send();
        next();
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})


module.exports = router;