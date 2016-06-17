var mongoose=require("mongoose");


var yelpCampSchema=new mongoose.Schema({
        name:String,
        image:String,
        description:String,
        comments:[
                     {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"comment"
                     }
                
                 ],
                 
        campOwner:{
                     id:{
                           type:mongoose.Schema.Types.ObjectId,
                           ref:"owners"
                        },
                     username:String    
             
                  }         
});

module.exports=mongoose.model("campgrnd",yelpCampSchema);