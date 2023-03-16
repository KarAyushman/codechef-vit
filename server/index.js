const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')
const jwt = require('jsonwebtoken') 
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/codechef')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    
    try{
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(req.body.email.indexOf("@vitstudent.ac.in", req.body.email.length - "@vitstudent.ac.in".length) == -1){
            res.json({status: "emailerr", error: 'invalid email address', registered: false})
        }
        else{
            const newPassword = await bcrypt.hash(req.body.password, 10)
            await User.create({
                name: req.body.name,
                email: req.body.email,
                password: newPassword,  
                regDate: req.body.date,
                logDate: "",      
            })
            res.json({ status: 'ok', registered: true })
        }
        
    } catch(err){
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate Email' ,registered: false })
    }
})

app.post('/api/login', async (req, res) => {
    var today = new Date(),
    date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear() + '-' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
    const user = await User.findOneAndUpdate({ email: req.body.email },{logDate: date})
    if(!user){
        return res.json({status:'error', error: 'User not Found', user:false}); 
    }
    const isPasswordValid = await bcrypt.compare(req.body.password,user.password)
    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, 'DH(f2@Ez(Fb_8;%f/1-1CX^.O{70.M')
        return res.json({ status:'ok', user: token })
    }
    else{
        return res.json({ status:'error', error:'Incorrect Credentials', user: false })
    }
    res.json({ status: 'ok'})
})

app.post('/api/auth', async (req, res) => {
    jwt.verify(req.body.token, 'DH(f2@Ez(Fb_8;%f/1-1CX^.O{70.M', function(err, decoded) {
        if (err) {
            return res.json({ status: 'illegal', user:false})
        }
        else {
            return res.json({ status: 'ok', user:true})
        }
    });
})

app.get('/api/allUsers', async (req, res) => {
    try{
        const allUsers = await User.find({})
        res.json({status:'ok', data:allUsers})
    }catch(err){
        console.log(err)
    }
})

app.listen(1898, ()=> {
    console.log('listening on 1898')
})