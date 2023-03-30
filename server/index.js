const express = require('express');
const mongoose = require('mongoose');
const dotenv =  require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const UserRigester = require('./router/UserRigister');
const UserLogin = require('./router/UserLogin');
const UserLogout = require('./router/UserLogout');
const UserForgetPass = require('./router/UserForgetPass');
const UserForgetPass2 = require('./router/UserForgetPass2');


const app = express();
dotenv.config();

const port = process.env.Port||4000;

app.listen(port,()=>console.log(`server is connect at the port, ${port}`));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'http://localhost:3000',credentials:true,
}))



app.get("/test",(req,res)=>{
    res.send('it is work');
});


//databse connection 

mongoose.connect(process.env.Mongo,(error)=>{
    if(error)
{
    console.log(error);
}
console.log("mongodb is connected")
});


//routing

//app.use('/rigster',rigistor);
app.use('/rigster',UserRigester);
app.use('/login',UserLogin);
app.use('/logout',UserLogout);
app.use('/forgetpass',UserForgetPass);
app.use('/forgetpass2',UserForgetPass2);