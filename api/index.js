const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth.js')
const usersRoute = require('./routes/users.js')
const postsRoute = require('./routes/posts.js')
const categoriesRoute = require('./routes/categories.js')
const multer = require('multer')
const path = require('path')
const PORT = process.env.PORT || '5000'

dotenv.config()
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'/images')))

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{console.log('Conneceted to MongoDB')})
.catch((err)=>{console.log(err)})

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name) //"hello.jpg" file name
    }
})

const upload = multer({storage:storage})

app.post('/api/upload',upload.single('file'),(req,res)=>{
    res.status(200).json('file uploaded successfully ..')
})

app.use('/api/auth',authRoute)
app.use('/api/users',usersRoute)
app.use('/api/posts',postsRoute )
app.use('/api/categories',categoriesRoute )

app.get('/',(req,res)=>{
    res.send('Server started...')
})

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})