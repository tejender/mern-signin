const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn');

const User = require('../models/userSchema');

router.get('/', (req,res) => {
    res.send(`HOme Page`);
});

router.get('/about',(req,res) => {
      res.send(`About Router Page`);
});

router.get('/contact', (req,res) => {
    res.send(`Contact Page`)
});



router.get('/signup', (req,res) => {
    res.send(`registration Page`)
});

router.post('/register',async (req,res)=>{

    const {name,email,phone,work,password,cpassword} = req.body;
    
    if (!name || !email || !phone || !work || !password || !cpassword){
            return res.status(422).json({error:"fill all the fields"});
    }

    try{
        const userExists = await User.findOne({email:email});
        if (userExists){
            return res.status(422).json({error:"user already exists"});
        }

        const user =new User ({name, email, phone, work, password, cpassword});

        const userRegister = await user.save();
        if (userRegister){
             res.status(201).json({message: "user registered successfully"});
        }else{
            res.status(500).json({error:"user already exists"});
        }

    }catch(err){
        console.log(err);
    }
    
});



    // login route

    router.post('/signin',async (req,res)=>{

        try{
            let token;
            const {email,password} = req.body;
            if(!email || !password){
                return res.status(400).json({error:"Please Fill all the Fields"});
            }
            const userLogin = await User.findOne({email:email});
            // console.log(userLogin);
            if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);

                 token = await userLogin.generateAuthToken();        
                console.log(token);    
            if(!isMatch){
                   return res.status(400).json({error:"Invalid Crediantials"});
            }else{
                res.json({message:"user logedin successfully"})   

            }
        }    
        else{
                res.json({message:"invalid credentials"})
            
        }
       
    }catch(err){
            console.log(err);
        }})
module.exports = router; 