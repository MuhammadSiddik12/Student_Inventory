const express = require('express')
const {home ,login ,signup ,login_admin ,login_admin_post ,signup_admin ,signup_admin_post ,edit_post ,delete_post ,edit , delete_, signup_post, login_post,search_post
}=require('../controller/user')
const router = express.Router()

router.get('/',home)
router.get('/signup',signup)
router.get('/login',login)
router.post('/signup',signup_post)
router.post('/login',login_post)
router.get('/loginAdmin',login_admin)
router.get('/signupAdmin',signup_admin)
router.post('/signupAdmin',signup_admin_post)
router.post('/loginAdmin',login_admin_post)
router.get('/delete',delete_)
router.post('/delete',delete_post)
router.post('/edit',edit_post)
router.get('/edit',edit)
router.post('/loginAdmin/search',search_post)

module.exports = router
