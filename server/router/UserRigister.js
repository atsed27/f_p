const express = require('express');
const router = express.Router();
const User = require("../model/userModel");
const bycryt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/',async(req,res)=>{
    
    try {
        const {
            email,passwordVerification,password
        }=req.body;
        if(!email || !password || !passwordVerification){
            return res.status(404).json({
                status:false,
                message:"please full all requier fild"
            })
        };
        if(password.length < 4){
            return res.status(404).json({
                status:false,
                message:"please password is grater than 4"
            })

        };
        if(password !== passwordVerification){
            return res.status(404).json({
                status:false,
                message:"It is not the same password"
            })
        };

        if(await User.findOne({email})){
            return res.status(404).json({
                status:false,
                message:'email is already used'
            })
        };

        const salt =  await bycryt.genSalt();
        const passwordHash = await bycryt.hash(password,salt);
        
        const NewUser = new User({
            email,passwordHash
        });
        const SavedUser = await NewUser.save()

        const token =jwt.sign({
            User:SavedUser._id,
        },
           process.env.JWY_S
        );
       // console.log(token)
        //send token to http
        const x =res.cookie("token",token,{
            httpOnly:true,
        }).send();
        //console.log(x)
        
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
})

module.exports = router;