const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const key = "devraj";

function middleAuth(req , res , next){
    const token = req.headers.token;
    const found = jwt.verify(token , key);
    if(found){
        next();
    }
    else{
        res.status(403);
    }
}

app.get('/user/article' , middleAuth , function(req , res){
    res.status(200).send("you are Hero");
})

app.post('/user/signin', function(req , res){
    const username = req.headers.username;
    const password = req.headers.password;

    const token = jwt.sign({username:username , password:password}, key);
    res.status(200).send(token);
})

app.listen(3000 , function(){
    console.log("online....")
})