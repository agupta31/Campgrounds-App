
var express=require("express"),
     router=express.Router(),
     campgrnd=require("../models/campground"),
     Owner=require("../models/owner"),
     Comments=require("../models/comment"),
     passport=require("passport");



//HOME PAGE
router.get("/",function(req,res){
    res.render("landing");
});



//=================================================

//CREATING GET AND POST ROUTES FOR REGISTRATION
router.get("/register",function(req,res){
       
       res.render("signUp/register");
});

router.post("/register",function(req,res){
       
         Owner.register(new Owner({username:req.body.username}),req.body.password,function(err,ownerData){
                if(err){
                    req.flash("error","username already exists");
                    res.redirect("/register");
                }
                else
                {
                      passport.authenticate("local")(req,res,function(){
                            res.redirect("/login");
                      });
                }
                    
         });
       
});


//===============================================
//CREATING GET AND POST ROUTES FOR LOGIN

router.get("/login",function(req,res){
     
        res.render("signUp/login");
});


router.post("/login",passport.authenticate("local",{
       successRedirect:"/index",
       failureRedirect:"/register"
}),function(req,res){
    
});

//================================================
//CREATING ROUTES FOR LOGOUT

router.get("/logout",function(req,res){
      req.logout();
      req.flash("success","successfully logged out");
      res.redirect("/index");
});


module.exports=router;