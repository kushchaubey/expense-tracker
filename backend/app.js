const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.get("/",(req,res,next)=>{


    res.status(200).send({message:"cool work from me"});

});

app.listen(3000,()=>{
    console.log("server running on port 3000");
})

