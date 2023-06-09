const express = require('express');
const con = require('./db');
const userRouter = require('./routes/user.router');
const noteRouter = require('./routes/note.router');
require("dotenv").config()
const cors=require("cors")

const app = express();
app.use(cors())

app.use(express.json())

app.use("/users",userRouter)

app.use("/notes",noteRouter)

app.listen(process.env.port,async()=>{
    try{
        await con;
        console.log("connecting to DB")
        console.log(`port running on ${process.env.port}`)

    }catch(err){
        console.log("something went wrong")
    }
})