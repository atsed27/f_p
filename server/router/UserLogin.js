const express =  require('express');
const User = require('../model/userModel');
const router = express.Router();
const bycryt = require('bcryptjs');
const jwt = require('jsonwebtoken');



router.post('/',async(req,res)=>{
    try {
        const {email,password} = req.body;

        //validation

        if(!email || !password){
            return res.status(404).json({
                status: false,
                message: "all input is required"
            })
        };
        const existing= await User.findOne({email})
        if( !existing ){
            return res.status(404).json({
                status:false,
                message:"Wrong email or password"
            });
        }
        const isMatch = await bycryt.compare(password,existing.passwordHash);
        if(!isMatch){
            return res.status(404).json({
                status:false,
                message:"Wrong password"
            })
        };

        //creat tocken
        const token = jwt.sign({
            User:existing._id,
        },
        process.env.JWY_S
        );

        //send the token 
    
        const x = res.cookie("token",token,{
            httpOnly:true,
    
        }).send();

       // console.log(x)

        
    } catch (error) {
        console.log(error);
        res.status(500).send()
        
    }
});
router.get('/loggedin',(req,res)=>{
    try {
        const token  =  req.cookies.token;
        if(!token) return res.json(false);
        jwt.verify(token,process.env.JWY_S);
        res.send(true);
        
         
    } catch (error) {
        console.error(false);
        
    }
});

module.exports = router;