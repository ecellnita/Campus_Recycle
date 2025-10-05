const mongoose=require("mongoose");
const {mailsender}=require("../utils/SendMail");

const requestschema=new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product"
    },
    requestdate:{
        type:Date,
        default:Date.now,
    },
    quantity:{
        type : String,
        required:true
    }
})




module.exports=mongoose.model("Request",requestschema);