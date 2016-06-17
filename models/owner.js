var mongoose=require("mongoose");

var passportLocalMongoose= require("passport-local-mongoose");

 var ownerSchema=new mongoose.Schema({
     
           username:String,
           password:String
 });
 
 ownerSchema.plugin(passportLocalMongoose);
 module.exports=mongoose.model("owners",ownerSchema);
