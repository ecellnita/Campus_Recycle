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

// Add request timeout middleware
app.use((req, res, next) => {
    // Set timeout to 60 seconds for all requests
    req.setTimeout(60000, () => {
        res.status(408).json({
            success: false,
            message: "Request timeout"
        });
    });
    next();
});

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

// Health check endpoint for Render
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is healthy",
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`)
})