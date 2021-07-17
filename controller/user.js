const student = require('../dbModels/dbSchema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.home = (req, res) => {
    res.send({ message: 'Hello, this is a home page' })
}

exports.signup = async (req, res) => {
    try {
        const pass = await bcrypt.hash(req.body.password, 10);
        const resu = await student.find({ email: req.body.email })
        if (resu.length >= 1) {
            res.send({ message: 'email already exists' })
        } else {
            user = {
                email: `${req.body.email}`,
                name: `${req.body.name}`,
                password: `${pass}`
            }
            const data = async () => {
                const result = await student.insertMany(user)
                console.log(result)
                res.send({ message: "Signup SuccessFully" })
            }
            data()
        }
    } catch (err) {
        res.send({ message: "Please fill all the fileds" })
    }
}

exports.login = async (req, res) => {
    const data = async () => {
        const result = await student.findOne({ email: req.body.email })
        console.log(result);
        const cmp = await bcrypt.compare(req.body.password, result.password)
        if (cmp) {
            const token = jwt.sign({ email: result.email, name: result.name }, 'siddik')
            res.cookie('token', token)
            res.send({ message: "Login successFully" })
        }
        else {
            res.send({ message: "Email not found Please SIgnUp First" })
        }
    }
    data()
}

exports.signup_admin = async (req, res) => {
    const pass = await bcrypt.hash(req.body.password, 10);
    const resu = await student.find({ email: req.body.email })
    console.log(resu);
    if (resu.length >= 1) {
        res.send({ message: 'email already exists' })
    }
    else {
        user = {
            email: `${req.body.email}`,
            name: `${req.body.name}`,
            password: `${pass}`
        }
        const data = async () => {
            const result = await student.insertMany(user)
            res.send({ message: "Admin SignUp SuccessFully" })
        }
        data()
    }
}

exports.login_admin = async (req, res) => {
    const data = async () => {
        const result = await student.findOne({ email: req.body.email })
        const cmp = await bcrypt.compare(req.body.password, result.password)
        if (cmp) {
            const token = jwt.sign({ email: result.email, name: result.name }, 'siddik')
            res.cookie('token', token)
            res.send({ message: "Admin Login SuccessFully" })
        }
        else {
            res.send({ message: "User not found Please Signup first" })
        }
    }
    data()
}


exports.edit = (req, res) => {
    try {
        const update = async () => {
            if (req.body.name == null) {
                res.send({ message: "please provide data tp update" })
            } else {
                const update_data = await student.findOneAndUpdate({ email: req.body.email }, { $set: { name: req.body.name } })
                console.log(update_data)
                if (update_data) {
                    res.send({ message: "Updated SuccessFully" })
                } else {
                    res.send({ message: "User not found To update" })

                }
            }
        }
        update()
    } catch (err) {
        res.send({ message: "User not found To update" })
    }
}

exports.delete_ = (req, res) => {
    try {
        const del = async () => {
            if (req.body.email == null) {
                res.send({ message: "please provide data tp update" })
            } else {
                const delete_data = await student.findOneAndDelete({ email: req.body.email })
                if (delete_data) {
                    res.send({ message: "Deleted SuccessFully" })
                } else {
                    res.send({ message: "User not found To update" })

                }
            }
        }
        del()
    } catch (err) {
        res.send({ message: "User Not found to delete" })
    }
}

exports.search = async (req, res) => {
    const result = await student.find({ name: req.body.name })
    res.send(result)
    if (result) {
        res.send(result)
    } else {
        res.send({ message: "Not found" })
    }
}