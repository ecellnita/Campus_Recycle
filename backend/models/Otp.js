const mongoose=require("mongoose");
const {mailsender}=require("../utils/SendMail");
const {otptemplate}=require("../mailtemplates/VerificationOtp");


const otpschema=new mongoose.Schema({
    email:{
        type:String,
    },
    otp:{
        type:String,
    },
    cretedat:{
        type:Date,
        default:Date.now,
        expires:5*60,
    },
})


module.exports=mongoose.model("Otp",otpschema);