const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/stu_inv',{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true},(err)=>{
    if (err) throw err;
    console.log('Database Connected')
})
