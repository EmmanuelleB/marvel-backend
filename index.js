const express = require ("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());



const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);
const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.get("/", (req,res)=>{
    try {
        res.status(200).json({message:"Hello"});
    } catch (error) {
       console.log(error.message)
    }
})

app.all("*",(req,res)=>{
    res.status(404).json({message:"Page not found"});
})

app.listen(3001,()=>{
    console.log("Server started");
})