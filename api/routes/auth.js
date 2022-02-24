const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

router.post('/register', async (req,res)=>{
    const {username,email,password} = req.body
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass =await bcrypt.hash(password,salt)
        const newUser = new User({
            username,email,password : hashedPass
        })
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/login', async (req,res)=>{
    const {username,password} = req.body 
    try {
        const user = await User.findOne({username})
        !user && res.status(400).json('Wrong credentials !')

        const validated = await bcrypt.compare(password,user.password)
        !validated && res.status(400).json('Wrong credentials !')

        const {password : pass,...others} = user._doc

        res.status(200).json(others)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router