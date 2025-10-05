const express=require("express");
const app=express();
require("dotenv").config();
PORT=process.env.PORT || 4000
const cors=require("cors");
const fileupload=require("express-fileupload");
const cookieparser=require("cookie-parser");
const {databaseConnect}=require("./config/ConnectToDatabase");
const {cloudinaryConnect}=require("./config/ConnectToCloudinary");
//
const authroutes=require("./routes/auth");
const userroutes=require("./routes/user");
const productroutes=require("./routes/product");
const categoryroutes=require("./routes/category");
const conversationroutes=require("./routes/conversation");
const transactionroutes=require("./routes/checktransaction");
const ratingandreviewsroutes=require("./routes/ratingandreviews");
//

console.log("Frontend URL:", process.env.HOST);
app.use(express.json())
app.use(cookieparser());
app.use(cors({
    // origin:true,
    origin:"*",
    credentials:true,
}))
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/',
}))
databaseConnect();
cloudinaryConnect();
//
app.use("/api/v1/auth",authroutes);
app.use("/api/v1/user",userroutes);
app.use("/api/v1/product",productroutes);
app.use("/api/v1/category",categoryroutes);
app.use("/api/v1/conversation",conversationroutes);
app.use("/api/v1/transaction",transactionroutes);
app.use("/api/v1/ratingandreviews", ratingandreviewsroutes);

//
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Server is Up and Running.....",
    })
})
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})