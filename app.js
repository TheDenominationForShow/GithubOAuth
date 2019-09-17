var express = require('express');
var app = express();

var https = require('https');
var querystring = require('querystring');

app.use('/', express.static('./static/login'));

app.use('/login/git/callback', (req,res)=>{
    console.log(req.params)
    console.log(req.path)
    console.log(req.query)
    var contents = querystring.stringify({
        client_id:'7762ba7c8c136b95daac',
        client_secret:'633aba54c307ba71122fc7223bda95e5174ab3f1',
        code:req.query.code
    });
    var options = {
        host:'github.com',
        path:'/login/oauth/access_token',
        method:'POST',
        headers:{
            'Content-Length':contents.length
        }
    }
    var access_token = '';
    var reqPost = https.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',function(data){
            console.log("data:",data);   //一段html代码
            var tmp = querystring.parse(data);
            access_token = tmp.access_token;
            console.log(access_token);
            var options1 = {
                headers: {'user-agent': 'node.js'}
            }
            https.get('https://api.github.com/user?access_token='+access_token,options1,function(res){
                res.setEncoding('utf8');
                res.on('data',function(data){
                    console.log("data:",data);
                });
            }).on('error', (e) => {
                console.error(e);
              });
        });

    });
   
    reqPost.write(contents);
    reqPost.end();
    res.send();
    res.end();
});
app.get('/hello',function(req,res){
    console.log(req)
    res.send("hello");
})
app.listen(8888);
console.log("server start")