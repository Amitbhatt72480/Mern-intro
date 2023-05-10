const express = require('express')
const {signupUser, loginUser} = require('../controllers/userController')
const router = express.Router()

// Login Route
router.post('/login', loginUser)


//Sign in router
router.post('/signup', signupUser)



module.exports = router