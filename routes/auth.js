const express= require('express');
const mongoose= require('mongoose');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const jwt=require('jsonwebtoken');
const {jwtsensitive}= require('../keys');
const user=mongoose.model('User');

router.post('/usersignup',(req,res)=>{
    const{phone,username,password}=req.body;
    if(!username || !password || !phone)
    {
        return res.status(422).json({error:'Please fill all the fields'});
    }
    user.findOne({$or: [{phone:phone,username:username}]})
    .then((existing_user)=>{
        if(existing_user)
        {
            return res.status(422).json({error:'Username or Phone already exists'});
        }
        bcryptjs.hash(password,10)
        .then((haspassword)=>{
            const newUser = new user({
                phone,
                username,
                password:haspassword
            })
            newUser.save()
            .then((issave)=>{
                res.json({message:'User registered successfully'});
            })
            .catch((err)=>{
                console.log(err);
                res.status(500).json('server error');
            })
        })
    })
})

router.post('/usersignin',(req,res)=>{
    const{username,password}=req.body;
    if(!username || !password)
    {
        return res.status(422).json('Please fill all the fields');
    }
    user.findOne({username:username})
    .then((existed_user)=>{
        if(!existed_user)
        {
            return res.status(422).json('Invalid username or password');
        }
        bcryptjs.compare(password,existed_user.password)
       .then((match)=>{
        if(match)
        {
            const token=jwt.sign({_id:existed_user._id},jwtsensitive)
            const{_id,username,password}=existed_user
            res.json({token,user:{_id,username,password}});
            console.log({token,user:{_id,username,password}});
        }
        else{
            return res.status(422).json({error:'Invalid username or password'});
        }
    })
    })
})

module.exports = router;
