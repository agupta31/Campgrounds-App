var express=require("express"),
    router=express.Router(),
     campgrnd=require("../models/campground"),
     Owner=require("../models/owner"),
     Comments=require("../models/comment"),
     middleware=require("../models/middleware");



//INDEX:lists all campgrounds
  router.get("/index",function(req,res){
    //get all data from the database.
  
     campgrnd.find(function(err,data){
           if(err)
           console.log("error hell ya");
           else
              res.render("index",{campList:data,currentUser:req.user});
             
     });
   
});



//POST ROUTE FOR ADDING A NEW CAMPGROUND TO THE CAMPGROUND DATABASE
  router.post("/index",middleware.isLoggedIn,function(req,res){
   
       //creating database 
      
        campgrnd.create(req.body.camp,function(err,campData){
            if(err)
               console.log(err);
           
            else{
                    //redirect to campgrounds page whenever a new camp is added
                   campData.campOwner.id=req.user._id;
                   campData.campOwner.username=req.user.username;
                   campData.save();
                   res.redirect("/index");  
                
                }
            
        });

  
});

//NEW :DISPLAYS A FORM WHICH ENABLES THE USER TO ADD A NEW CAMPGROUND
  router.get("/index/new",middleware.isLoggedIn,function(req,res){
    
    res.render("new");
});




//SHOW:DISPLAYS INFO ABOUT A PARTICULAR CAMPGROUND
  router.get("/index/:id",function(req,res){

    var campId=req.params.id;

      campgrnd.findById(campId).populate("comments").exec(function(err,data){
             if(err)
                 console.log(err);
             else{
              
                  res.render("show",{campData:data});
               
                 }
              
      });
    
     
});


//GET ROUTE FOR EDITING A CAMPGROUND
router.get("/index/:id/edit",middleware.checkCampOwner,function(req,res){
    
      campgrnd.findById(req.params.id,function(err,data){
             if(err)
               console.log(err);
             else
                 res.render("modify/editCamp",{campData:data});
          
      });
    
       
});

//PUT ROUTE FOR UPDATING THE CAMPGROUND

router.put("/index/:id/edit",function(req,res){
          
          
          campgrnd.findByIdAndUpdate(req.params.id,req.body.camp,function(err,data){
                 if(err)
                    console.log(err);
                 else
                    res.redirect("/index/"+req.params.id);
                      
          });
    
});


//DELETE ROUTE FOR DELETING A CAMPGROUND

router.delete("/index/:id/delete",middleware.checkCampOwner,function(req,res){
        campgrnd.findByIdAndRemove(req.params.id,function(err,data){
                     if(err)
                        console.log(err);
                     else
                        res.redirect("/index");
        });
    
});


module.exports=router;