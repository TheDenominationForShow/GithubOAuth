var express = require('express');
var app = express();

app.use('/', express.static('./static/login'));
app.use('/login/git/callback', express.static('./static/'));
app.get('/hello',function(req,res){
    console.log(req)
    res.send("hello");
})
app.listen(8888);
console.log("server start")