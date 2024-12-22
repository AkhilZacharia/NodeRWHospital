const express = require('express');
const app = new express();

const routes= require('./router/router');
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.send('hi');
        }) ;

app.use("/",routes);

app.listen(4000,()=>{
    console.log("server is listening on port 4000");
});
