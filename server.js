const express = require('express')
const app = express()
const path = require('path')
const user = require('./routes/user')
const admin = require('./routes/admin')
const mongoose = require('mongoose')
const session = require('express-session')



app.set('view engine','ejs')
app.set('views', [path.join(__dirname,'views/admin'), path.join(__dirname,'views')])

app.use('/static',express.static(path.join(__dirname,'public'))) 
app.use('/images',express.static(path.join(__dirname,'public/images')))
app.use('/assets',express.static(path.join(__dirname,'public/assets')))

app.use(express.urlencoded({extended:true}))

app.use(session(
    {secret:'thisismysecret',
     resave:false,
     saveUninitialized:true,
    }))











app.use('/',user);
app.use('/admin',admin)



// app.listen(3300,()=>{
// console.log('server running');
// })


mongoose.connect('mongodb://0.0.0.0:27017/pride',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    const port = 3201;
    app.listen(port, ()=>{
        console.log(`Server Started at localhost:${port}`);
    })
}).catch((e)=>{
    console.log('Error connecting to mongodb',e);
})