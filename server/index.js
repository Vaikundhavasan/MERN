const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const createUser = require('./models/createUser.model');


const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const URI = process.env.URI;

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.post('/api/user',async(req,res)=>{
   try {
       const user = await createUser.create(req.body);
       res.status(200).json(user);
   } catch (error) {
        res.status(500).json({message:error.message})
   }
})

app.get('/api/user',async(req,res)=>{
    try {
       const users = await createUser.find({});
       res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/api/user/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await createUser.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.post('/api/user/:id',async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await createUser.findByIdAndUpdate(id,req.body);
        if(!user) 
            return res.status(404).json({message:"User not found"});
        const updatedUser = await createUser.findById(id);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
} )

mongoose.connect(URI).then( ()=>{
    console.log("DB Connected")
    app.listen(2000,()=>{
        console.log("Server Started")
    })
}).catch( ()=>{
    console.log("Connection Failed")
} )


