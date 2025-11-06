const { Router } = require("express");
const authMiddelware = require("../Middelwares/authMiddelware");
const { userSignUp, userLogin, refreshToken, getUser } = require("../Controllers/userController");

const authRoutes = Router()

authRoutes.get('/' , authMiddelware , (req, res) => {res.send('Main get')})
authRoutes.post('/api/signup' , userSignUp)
authRoutes.post('/api/login' , userLogin)
authRoutes.post('/api/refresh-token' , refreshToken)
authRoutes.get('/api/profile' , authMiddelware , getUser)



module.exports = authRoutes