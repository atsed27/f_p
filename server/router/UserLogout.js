const express = require('express');
const router = express.Router();


router.get('/', function(req,res){
    res.cookie('token',"",{
       httpOnly:true,
       expires: new Date(0),
    }).send();
});

module.exports = router;