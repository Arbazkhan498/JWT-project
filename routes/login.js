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
let accessTokens;

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();

    // console.log(user.password)

    if (!user) {
        return res.json({ status: 'error', error: ' invalid' })
    }
    if (await bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            id: user._id,
            username: user.username
        }, "access",{expiresIn:'20s'})
        accessTokens = JSON.stringify(accessToken);


        const refreshToken = jwt.sign({
            id: user._id,
            username: user.username
        }, "refresh",{expiresIn:'24h'})

        return res.json({ status: 'ok', data: accessToken, data2:refreshToken })
    }

    res.json({ status: 'error', data: 'invalid ' })
})


module.exports = router;
