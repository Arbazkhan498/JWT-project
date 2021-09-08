const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/user');
mongoose.connect('mongodb://localhost:27017/login-db_jwt', {
    useNewurlParser: true,
    useUnifiedTopology: true,


})
const port = 3000;

app.use(express.json())

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })
)
app.use('/',require(path.join(__dirname,"./routes/register.js")))
app.use('/',require(path.join(__dirname,'./routes/login.js')))
app.use('/',require(path.join(__dirname,'./routes/auth.js')))

app.use('/', express.static(path.join(__dirname, 'static')))







app.listen(port)
