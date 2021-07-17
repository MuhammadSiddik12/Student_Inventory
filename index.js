const express= require('express')
const app = express()
const db = require('./dbConnecton/db')

// middleware
app.use(express.json())
app.use('/',require('./router'))


app.listen(4000,()=>{
    console.log('server is runnig')
})