const express = require('express')
const { home, login, signup, login_admin, signup_admin, edit, delete_, search
} = require('../controller/user')
const router = express.Router()
const jwt = require('jsonwebtoken')

router.get('/', home)
router.post('/signup', signup)
router.post('/login', login)
router.get('/loginAdmin', login_admin)
router.get('/signupAdmin', signup_admin)
router.post('/signupAdmin', signup_admin)
router.post('/loginAdmin', login_admin)
router.post('/delete', auth, delete_)
router.post('/edit', auth, edit)
router.post('/loginAdmin/search', auth, search)


function auth(req, res, next) {
    try {
        const authHeader = req.headers.cookie
        const token = authHeader.split('=')[1]
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, 'siddik', (err, user) => {
            if (err) return res.sendStatus(403)
            res.user = user
            next()
        })
    } catch (err) {
        res.send({ message: 'unAuthorized' })
    }
}
module.exports = router
