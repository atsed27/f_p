const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const bycryt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserForgetPass = require('./UserForgetPass');


router.get('/',(req,res)=>{
    res.send('da')
});
router.post('/' ,UserForgetPass ,async(req,res,email)=>{
    try {
        const {
            password,
        }=req.body;
        if(!password){
            return res.status(404).json({
                status: false,
                message:'Inter your password'
            })
        };
        const existing = await User.findOne({email});
        const isMatch = await bycryt.compare(password,existing.passwordHash);
        if(!isMatch){
            return res.status(404).json({
                status:false,
                message:"Wrong password"
            })
        };

       
        
        
    } catch (error) {
        console.log(error);
        res.status(500).send()
    }
})


module.exports = router;