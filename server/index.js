const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27107/codechef-login-page')

app.post('/api/register', async (req, res) => {
    console.log(req.body)
    try{
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,        
        })
        res.json({ status: 'ok'})
    } catch(err){
        console.log(err)
        res.json({ status: 'error', error: 'Duplicate Email' })
    }
})

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password})
    if (user) {
        return res.json({ status:'ok', user: true })
    }
    else{
        return res.json({ status:'error', user: false })
    }
    res.json({ status: 'ok'})
})

app.listen(1898, ()=> {
    console.log('listening on 1898')
})