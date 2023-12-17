const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

// Use a string as the secret, not a function
const sessionSecret = 'your-secret-key-here';

const credential = {
    email: "admin@gmail.com",
    password: "admin123"
}

// LOGIN USER
// LOGIN USER
router.post("/login", (req, res) => {
    if (req.body.email == credential.email && req.body.password == credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
    } else {
        res.render("base", { title: "Express", logout: "Invalid username or password" });
    }
});


router.get("/dashboard", (req, res) => {
    if (req.session.user) {
        res.render("dashboard", { user: req.session.user, title: "Dashboard" });
    } else {
        res.send("unauthorized");
    }
});

router.get("/logout",(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("error")
        }else{
            res.render("base",{title:"Express",logout:"logout succcessfully....!"})
        }
    })
})
module.exports = router;
