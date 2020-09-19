const express = require('express')

const { auth } = require('./../controllers')
const { signInController, signUpController, passwordResetConfirmController, passwordResetRequestController } = auth;
 
const router = express.Router()

// Auth
router.post('/auth/signin', signInController)
router.post('/auth/signup', signUpController)
router.post('/auth/reset', passwordResetRequestController) 
router.put('/auth/reset', passwordResetConfirmController) 

module.exports = router