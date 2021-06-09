const express= require('express')
const app = express()
const db = require('./dbConnecton/db')
const path = require('path')
const bodyParser = require("body-parser");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use('/',require('./router'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(4000,()=>{
    console.log('server is runnig')
})