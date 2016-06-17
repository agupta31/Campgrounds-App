var express=require("express"),
    passport=require("passport"),
    mongoose=require("mongoose"),
    campgrnd=require("./campground"),
    Comments=require("./comment");
     
var middleware={
    
          isLoggedIn:function(req,res,next){
              
                       if(req.isAuthenticated())
                           next();
                        else
                        {   req.flash("error","please log in");
                            res.redirect("/login");
                            
                        }
          },
          
          checkCampOwner:function(req,res,next){
                   if(req.isAuthenticated()){
                           campgrnd.findById(req.params.id,function(err,campData){
                                  if(err)
                                     console.log(err);
                                  else
                                     {
                                         if(campData.campOwner.username===req.user.username)
                                              return next();
                                              
                                          else
                                             req.flash("error","not authorized to edit/delete");
                                             res.redirect("/index/"+req.params.id);
                                     }
                                  
                           });
                       
                       
                   }
                   else{
                       req.flash("error","please log in");
                       res.redirect("/login");
                      
                       }
                  
              
              
          },
          
          checkCommentOwner:function(req,res,next){
                   if(req.isAuthenticated())
                   {
                           Comments.findById(req.params.comment_id,function(err,commentData){
                                  if(err)
                                     console.log(err);
                                  else
                                     {
                                          if(commentData.author.username===req.user.username){
                                               return next();
                                          }
                                           else{
                                              req.flash("error","not authorized to edit/delete");
                                              res.redirect("/index/"+req.params.id);
                                              
                                           }
                                     }
                           });
                       
                       
                   }
                   else
                     res.redirect("/login");
              
              
              
          }
          
}


module.exports=middleware;