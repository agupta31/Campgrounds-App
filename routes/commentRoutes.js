var express=require("express"),
    router=express.Router(),
     campgrnd=require("../models/campground"),
     Owner=require("../models/owner"),
     Comments=require("../models/comment"),
     middleware=require("../models/middleware");

//NEW ROUTE-THIS TAKES US TO THE ADD NEW COMMENTS PAGE
  router.get("/index/:id/comments/new",middleware.isLoggedIn,function(req,res){
          var id=req.params.id;
          
          campgrnd.findById(id,function(err,data){
              if(err)
                console.log(err);
              else
                 {
                     res.render("comments/new",{campData:data});
                 }
                
          });

});

//POST METHOD FOR ADDING COMMENTS TO THE CORRESPONDING USER
  router.post("/index/:id/comments",middleware.isLoggedIn,function(req,res){
        
        campgrnd.findById(req.params.id,function(err,campData){
                    if(err)
                      console.log(err);
                    else{
                          console.log(campData);
                          Comments.create(req.body.comment,function(err,commentData){
                                     if(err)
                                        console.log(err);
                                     else
                                        {  
                                            commentData.author.id=req.user._id;
                                            commentData.author.username=req.user.username;
                                            commentData.save();
                                            
                                            campData.comments.push(commentData);
                                            campData.save(function(err,newCampData){
                                                if(err)
                                                  console.log(err);
                                                else
                                                  console.log(newCampData);
                                            });
                                            req.flash("success","comments successfully created");
                                            res.redirect("/index/"+req.params.id);
                                        }
                                
                                  });
                          
                              
                        }
        });
        
    
});

//==================================================
//GET ROUTE FOR EDITING COMMENTS

router.get("/index/:id/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
    
    campgrnd.findById(req.params.id).populate("comments").exec(function(err,data){
           if(err)
              console.log(err);
            else
               res.render("comments/editComments",{campData:data});
          
    });
     
});


//UPDATE ROUTE FOR UPDATING COMMENTS DATABASE
router.put("/index/:id/:comment_id/edit",middleware.checkCommentOwner,function(req,res){
       
         Comments.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,camp){
                   if(err)
                     console.log(err);
                    else {
                         req.flash("success","comments successfully updated");
                         res.redirect("/index/"+req.params.id);
                    }
            });
});


//DELETE ROUTE FOR DELETING A COMMENT FROM THE COMMENT DATABASE

router.delete("/index/:id/:comment_id/delete",middleware.checkCommentOwner,function(req,res){
          
             Comments.findByIdAndRemove(req.params.comment_id,function(err){
                             if(err)
                              console.log(err);
                             else
                                res.redirect("/index/"+req.params.id);
             });
    
    });

module.exports=router;