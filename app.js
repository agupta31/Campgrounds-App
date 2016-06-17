var express=require("express"),
app=express(),
bodyParser=require("body-parser"),
mongoose=require("mongoose"),
campgrnd=require("./models/campground"),
Comments=require("./models/comment"),
Owner=require("./models/owner"),
passport=require("passport"),
passportLocal=require("passport-local"),
passportLocalMongoose=require("passport-local-mongoose"),
methodOverride=require("method-override"),
flash=require("connect-flash");

// seedDb=require("./seeds")();

//================================================
//REQUIRING ROUTES
var commentRoute=require("./routes/commentRoutes"),
    campRoute=require("./routes/campRoutes"),
    authRoute=require("./routes/authRoutes");




app.use(require("express-session")({
    secret:"life",
    resave:false,
    saveUninitialized:false

}));
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.use(new passportLocal(Owner.authenticate()));
passport.serializeUser(Owner.serializeUser());
passport.deserializeUser(Owner.deserializeUser());

app.use(function(req,res,next){
    //WHATEVER IS STORED IN req.local WILL BE AVAILABLE TO ALL TEMPLATES
     res.locals.currentUser=req.user;
     res.locals.errorMessage=req.flash("error");
     res.locals.successMessage=req.flash("success");
     //THIS IS WHAT GUIDES US TO THE NEXT ROUTE.THIS IS THE MIDDLEWARE WHICH WILL RUN FOR EVERY SINGLE ROUTE.
     //IN SHORT THIS IS WHAT WILL GUIDE currentUser FROM ONE ROUTE TO THE OTHER.
     next();
});


mongoose.connect("mongodb://akuGreat:password1@ds015403.mlab.com:15403/yelpcamp");

// mongodb://akuGreat:password1@ds015403.mlab.com:15403/yelpcamp


//CLEAN UP CODE
 app.use(campRoute);
 app.use(commentRoute);
 app.use(authRoute);



app.listen(process.env.PORT,process.env.IP,function(){
    
    console.log("server started");
});