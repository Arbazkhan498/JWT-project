const express = require('express')
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const path = require('path');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken');


mongoose.connect('mongodb://localhost:27017/login-db_jwt', {
    useNewurlParser: true,
    useUnifiedTopology: true,


})

router.post('/api/authentication/', (req, res) => {

    try {

        const token = req.body.token;

        const user = jwt.verify(token, "access")
        console.log(user)
        res.json({ status: 'ok' })
    } catch (err) {
        res.status(403).json({ error: 'User not authenicated' })
        console.log(err)
    }

})

router.post('/api/auth2', (req, res) => {
    try {
        const token2 = req.body.token2;
        const user = jwt.verify(token2, "access")
        console.log(user)
        res.json({ status: 'ok' })
    } catch (err) {
        res.status(403).json({error:'User not authenticated'})
        console.log(err)
    }

})

router.post('/api/ref/', (req, res) => {
    try {
        // console.log(req.body)
        const refToken = req.body.token;

        if (!refToken) {
            return res.status(403).json({ error: "user not authenticated" })
        }

        jwt.verify(refToken, "refresh", (err, user) => {
            if (!err) {
                const newAccessToken = jwt.sign({ id: user.id, username: user.username }, "access",{expiresIn:'20s'})
                // console.log(newAccessToken)
                const user1 = jwt.verify(newAccessToken, 'access')
                // console.log(user1);
                res.json({ status: 'ok', data: newAccessToken });
            } else {
                return res.status(403).json({ error: "user not authenticated" })
            }
        })


    } catch (err) {
        console.log(err)
    }
})

module.exports = router;