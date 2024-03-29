const router = require('express').Router()
const Post = require('../models/Post.js')


//create
router.post('/', async (req,res)=>{
    const newPost = new Post(req.body)
    try {   
            const savedPost = await newPost.save()
            res.status(200).json(savedPost)
        } catch (error) {
            res.status(500).json(error)
        }
})

//update
router.put('/:id', async (req,res)=>{
            try {
                const post = await Post.findById(req.params.id)
                if(post.username===req.body.username){
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id,{
                        $set:req.body
                    },{new:true}) 
                    res.status(200).json(updatedPost)
                }
                res.status(401).json('You can update only your post')
            } catch (error) {
                res.status(500).json(error)
            }
})

//delete
router.delete('/:id', async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        if(post.username===req.body.username){
            await post.delete()
            res.status(200).json("post has been deleted")
        }
        res.status(401).json('You can delete only your post')
    } catch (error) {
        res.status(500).json(error)
    }
})

//get post
router.get('/:id', async (req,res)=>{
    try {   
            const post = await Post.findById(req.params.id)
            res.status(200).json(post)
        } catch (error) {
            res.status(500).json(error)
        }
})

//get all posts
router.get('/', async (req,res)=>{
    const username = req.query.user
    const catName = req.query.cat
    try {   
            let posts;
            if(username){
                posts= await Post.find({username:username})
            } else if(catName){
                posts= await Post.find({categories:{
                    $in:[catName]
                }})
            } else{
                posts = await Post.find() 
            }
            res.status(200).json(posts)
        } catch (error) {
            res.status(500).json(error)
        }
})

module.exports = router