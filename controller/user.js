const student = require('../dbModels/dbSchema')
const bcrypt = require('bcrypt')

exports.home=(req, res) => {
    res.send('<center><a href="/login">Click Here To Go To The Login Page</a></center>')
}

exports.signup = (req, res) => {
    res.render('signup')
}

exports.signup_admin = (req, res) => {
    res.render('admin_s')
}

exports.login_admin = (req, res) => {
    res.render('admin_l') 
}

exports.login=(req, res) => {
    res.render('login')
}

exports.edit = (req, res) => {
    res.render('edit')
}

exports.delete_= (req, res) => {
    res.render('delete')
}

exports.signup_post= async (req, res) => {
    try{
    const pass = await bcrypt.hash(req.body.password, 10);
    const resu = await student.find({ email: req.body.email })
    console.log(resu);
    console.log(resu.length>=1)
    if (resu.length>=1){
        res.send('email already exists')
    }else{
    user = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        password: `${pass}`
    }
    const data = async () => {
        const result = await student.insertMany(user)
        console.log(result)
        res.send('<a href="/login">Click Here To Go To The Login Page</a>')
    }
    data()}}catch(err){
        console.log(err)
    }
}

exports.login_post=async(req, res) => {
    const data = async () => {
        const result = await student.find({ email: req.body.email })
        if (result.length > 0) {
            for (let x in result) {
                const cmp = await bcrypt.compare(req.body.password, result[x].password)
                if (cmp){
                    res.render('index', { userData: result[0] });
                }
                else {
                    res.send('User Not Found <center><a href="/login">Click Here To Go To The Login Page</a></center>')
                }
            }
        }
        else {
            res.send('User Not Found <center><a href="/login">Click Here To Go To The Login Page</a></center>')
        }
    }
    data()
}

exports.signup_admin_post=async(req,res)=>{
    const pass = await bcrypt.hash(req.body.password, 10);
    const resu = await student.find({ email: req.body.email })
    console.log(resu);
    if (resu.length>=1){
        res.send('email already exists <center><a href="/signupAdmin">Click Here To Go To The Login Page</a></center>')
    }
    else{
    user = {
        email: `${req.body.email}`,
        name: `${req.body.name}`,
        password: `${pass}`
    }
    const data = async () => {
        const result = await student.insertMany(user)
        res.send('<a href="/loginAdmin">Click Here To Go To The Login Page</a>')
    }
    data()}
}

exports.login_admin_post=async(req, res) => {
    const data = async () => {
        const result = await student.find({ email: req.body.email })
        if (result.length > 0) {
            for (let x in result) {
                const cmp = await bcrypt.compare(req.body.password, result[x].password)
                if (cmp){
                    const all = async () =>{
                        const result2= await student.find()
                        console.log(result2)
                        res.render('ad', { userData: result2 });
                    } 
                    all()
                }
                else {
                    res.send('User Not Found <center><a href="/loginAdmin">Click Here To Go To The Login Page</a></center>')
                }
            }
        }
        else {
            res.send('User Not Found <center><a href="/loginAdmin">Click Here To Go To The Login Page</a></center>')
        }
    }
    data()
}


exports.edit_post = (req, res) => {
    const update = async () => {
        const update_data = await student.updateMany({email:req.body.email }, { $set: {name: req.body.name} })
        console.log(update_data)
        res.send(`user updated successfully <center><a href="/login">Click Here To Go To The Login Page</a></center>`)
    }
    update()
}

exports.delete_post=(req, res) => {
    const del = async () => {
        const delete_data = await student.deleteOne({ email: req.body.email })
        if (delete_data.deletedCount === 0) {
            res.send(`user already delete or not found <center><a href="/login">click Here To Go To The Login Page</a></center>` )
        } else {
            res.send(`user deleted successfully <center><a href="/login">Click Here To Go To The Login Page</a></center>`)
        }
    }
    del()
}

exports.search_post = async(req,res)=>{
    const result = await student.find({ name: req.body.name })
res.send(result)
}