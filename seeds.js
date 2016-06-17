var mongoose=require("mongoose");
var campgrnd=require("./models/campground");
var Comment=require("./models/comment");
// var Owner=require("./models/owner");

var campList=[
            {
                name:"camp heaven",
                image:"https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg",
                description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                
            },
            {
                name:"canyon grid",
                image:"https://farm9.staticflickr.com/8422/7842069486_c61e4c6025.jpg",
                description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                
            },
            {
                name:"batarang camp",
                image:"https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg",
                description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                
            }
            
    
    
    ];





function seedB(){
     campgrnd.remove({},function(err){
    if(err)
     console.log(err);
        else{
          console.log("campgrounds removed");
              campList.forEach(function(data){
            
                    campgrnd.create(data,function(err,campData){
                         if(err)
                           console.log(err);
                         else
                              {
                                  //CREATING COMMENTS
                                      Comment.create({
                                              text:"campgrounds are  the best summer retreat",
                                              author:"akash"
                                          
                                      },function(err,commentData){
                                                 if(err)
                                                   console.log(err);
                                                 else{
                                                    campData.comments.push(commentData);
                                                    campData.save();
                                                    console.log("created new comments");
                                                    
                                                     }
                                                  
                                });
                                             
    
                              }
                             
                
                          });
                  });
    
          
           }
});

}




module.exports=seedB;


    
    




