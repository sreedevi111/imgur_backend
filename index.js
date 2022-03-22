const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();
app.use(express.json());

require("./routers/UserRouter")(app);       //since it is a function
require("./routers/ImageRouter")(app);

//connecting to mongodb

mongoose.connect(process.env.MONGO_URL)

    //if connection is successful
    // it is promise

    .then(()=> console.log("database connected"))
    .catch((error)=>console.log(error) );

//get methodpm
app.get("/", (req,res) => res.send("hello people"));


const Port  = process.env.PORT || 8000;

app.listen(Port, ()=> console.log(`server is live on port ${Port}`));



