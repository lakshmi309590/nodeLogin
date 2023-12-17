const express =require("express");
const app=express();
const path=require("path");
const bodyparser = require("body-parser");
const session=require("express-session");
const router=require("./router")


const port =3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine','ejs');
//load static assets

app.use("/static",express.static(path.join(__dirname,'public')))
app.use("/assets",express.static(path.join(__dirname,'public/assets')))

app.use(session({
    secret: 'your-secret-key-here', // Use a fixed string as the secret
    resave: false,
    saveUninitialized: true
}));


app.use('/route',router);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  

//home route

app.get('/',(req,res)=>{
    res.render('base',{title:"Logic System"});
})

app.listen(port,()=>{
    console.log("listening to the server on http://localhost:3000")
})