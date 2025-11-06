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

otpschema.pre("save",async function(next){
    try{
        console.log("Sending OTP to:", this.email, "OTP:", this.otp);
        const mailresponse=await mailsender(this.email,"Verification Email From NITASPACE",otptemplate(this.otp))
        console.log("Mail response is =>", mailresponse?.messageId || "Email sent");
        next();
    }
    catch(err){
        console.log("Cannot send OTP email:");
        console.log(err.message);
        // Pass the error to the next middleware to stop the save operation
        next(new Error(`Failed to send OTP email: ${err.message}`));
    }
})










module.exports=mongoose.model("Otp",otpschema);