const express = require('express')
const mongoose= require('mongoose');
const router= express.Router();
const User= require('../models/user');
const bcrypt = require('bcryptjs');
const path= require('path');
const bodyParser= require('body-parser')

mongoose.connect('mongodb://localhost:27017/login-db_jwt', {
    useNewurlParser: true,
    useUnifiedTopology: true,


})

router.post('/api/register', async (req, res) => {
    
    try{
        
    const { username, password: plainText } = req.body;
    
    if (!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }
    if (!plainText || typeof plainText !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password' })
    }
    if (plainText.length < 5) {
        return res.json({ status: 'error', error: 'password should be at least 6 characters' })
    }
    
    const password = await bcrypt.hash(plainText, 10)
   

    try{
        const response = await User.create({
            username, password
        })
        console.log('user is created ', response);
    }catch(err){
        console.log(err);
        if (err.code === 11000) {
            return res.json({ status: 'error', error: 'Username is already existed' })
        }
    
    }

    }catch(err){
        
        throw err
        
    }
   
   
    res.json({ status: 'ok' })

    
})

module.exports = router;


