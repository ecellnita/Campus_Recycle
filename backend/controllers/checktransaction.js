const {mailsender}=require("../utils/SendMail");
const {checktransactiontemplate}=require("../mailtemplates/Checktransaction");
require("dotenv").config();
const otpgenerator=require("otp-generator");
const Checktransaction=require("../models/Checktransaction");



exports.sendtransotp=async (req,res)=>{
    try{
        const {id,email}=req.user;
        const {buyermail,productid}=req.body;
        if(!buyermail){
            return res.json({
                success:false,
                message:"buyer email not found"
            })
        } 

        const otp=otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
        const checkotp=await Checktransaction.findOne({otp});
        if(checkotp){
            otp=otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            })
            checkotp=await Checktransaction.findOne({otp});
        }

        const otpdata=await Checktransaction.create({buyermail,productid,otp});
        res.json({
            success:true,
            messsage:"OTP send Successfully",
            data:otpdata,
        })


    }
    catch(err){
        console.log(err);
        console.log("Cannot send OTp");
        return res.json({
            success:false,
            message:"could not send OTP",
        })
    }
}



exports.verifytransotp=async (req,res)=>{
    try{
        const {buyermail,productid,otp}=req.body;
        const latestotp=await Checktransaction.find({buyermail:buyermail, productid:productid}).sort({cretedat:"desc"}).limit(1);
        if(!latestotp || latestotp[0].otp!==otp){
            return res.json({
                success:false,
                message:"OTP Not Found"
            })
        }
        console.log("otp is verified");

        res.json({
            success:true,
            message:"transaction verified successfully"
        })

        
    }
    catch(err){
        console.log(err);
        console.log("Cannot verify OTp");
        return res.json({
            success:false,
            message:"could not verify OTP",
        })
    }
}


