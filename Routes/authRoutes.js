const { Router } = require("express");
const authMiddelware = require("../Middelwares/authMiddelware");
const { userSignUp, userLogin } = require("../Controllers/userController");

const authRoutes = Router()

authRoutes.get('/' , authMiddelware , (req, res) => {res.send('Main get')})
authRoutes.post('/api/signup' , userSignUp)
authRoutes.post('/api/login' , userLogin)
authRoutes.get('/api/profile' , authMiddelware , (req , res) => {return res.send('hhh')})



module.exports = authRoutes