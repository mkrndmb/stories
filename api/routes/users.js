const router = require('express').Router()
const User = require('../models/User.js')
const bcrypt = require('bcrypt')

//get user
router.get('/:id', async (req,res)=>{
    try {   
            const user = await User.findById(req.params.id)
            const {password,...others} = user._doc
            res.status(200).json(others)
        } catch (error) {
            res.status(500).json(error)
        }
})

//update
router.put('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password,salt)
        }
            try {
                const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set : req.body},{new:true})
                res.status(200).json(updatedUser)
            } catch (error) {
                res.status(500).json(error)
            }
    } res.status(401).json("You can update only your acc.")
})

//delete
router.delete('/:id', async (req,res)=>{
    if(req.body.userId===req.params.id){
        try {   
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json("User has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
    } res.status(401).json("You can delete only your acc.")
})




module.exports = router