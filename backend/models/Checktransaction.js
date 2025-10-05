const mongoose=require("mongoose");
const {mailsender}=require("../utils/SendMail");
const {checktransactiontemplate}=require("../mailtemplates/Checktransaction");

const Checktransactionschema=new mongoose.Schema({
    buyermail:{
        type:String,
    },
    productid:{
        type:mongoose.Schema.Types.ObjectId
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


Checktransactionschema.pre("save",async function(next){
    try{
        const mailresponse=await mailsender(this.buyermail,"Verification Email for transaction",checktransactiontemplate(this.otp))
        console.log("mail response is =>",mailresponse);
    }
    catch(err){
        console.log("Cannot save OTP");
        console.log(err.message);
    }
    next();
})


module.exports=mongoose.model("Checktransaction",Checktransactionschema);