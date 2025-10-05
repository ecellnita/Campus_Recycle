const Category = require("../models/Category");
const Product = require("../models/Product");
const Profile = require("../models/Profile");
const User=require("../models/User");
const {cloudinaryuploader}=require("../utils/cloudinaryuploader");

require("dotenv").config()

exports.createproduct=async (req,res)=>{
    console.log(req.body);
    try{
        const {id,email}=req.user;
        const imagearr=req.files.images;
        const {productname,productdescription,price,status,quantity,categoryid}=req.body;
        if(!id || !email || !productname || !productdescription || !price || !status || !quantity || !categoryid){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }
        var images=[];

        for(i in imagearr){
            const imageurl=(await cloudinaryuploader(imagearr[i],process.env.FOLDER_NAME,1000,1000)).secure_url;
            images.push(imageurl);
        }

        const productdetails=await Product.create({
            productname,
            productdescription,
            price,
            images,
            status,
            quantity,
            owner:id,
            category:categoryid
        })

        console.log("product details=>",productdetails);
        const userproupdate=await User.findByIdAndUpdate(id,
            {$push:{products:productdetails._id}}
        )

        const categorydetails=await Category.findByIdAndUpdate(
            categoryid,
            {$push:{products:productdetails._id}})
        
        res.json({
            success:true,
            message:"Created Product successfully",
            data:productdetails
        })

}
catch(err){
    return res.json({
        success:false,
        message:err.message,
    })
}

}


exports.updateproduct=async (req,res)=>{
    try{
        
        const {id,email}=req.user;
    
        const imagearr=req?.files?.images;
        
        const {productid,productname,productdescription,price,status,quantity}=req.body;

        const user=await User.findById(id);
        if(!user){
            return res.json({
                success:false,
                message:"User Not Registered",
            })
        }
        var images=[];
        const productdetails=await Product.findById(productid);
        // console.log("productdetails are =>",productdetails)

        if(imagearr){
            for(i in imagearr){
                const imageurl=(await cloudinaryuploader(imagearr[i],process.env.FOLDER_NAME,1000,1000)).secure_url;
                images.push(imageurl);
            }
            productdetails.images=images;
        }

        if(productname){
            productdetails.productname=productname;
        }
        if(productdescription){
            productdetails.productdescription=productdescription;
        }
        if(price){
            productdetails.price=price;

        }
        if(status){
            productdetails.status=status;
        }
        if(quantity){
            productdetails.quantity=quantity;
        }
        await productdetails.save();

        const proupdated=await Product.findById(productid);
        res.json({
            success:true,
            message:"Product updated successfully",
            data:proupdated
        })
}
catch(err){
    return res.json({
        success:false,
        message:err.message,
    })
}

}



exports.deleteproduct=async (req,res)=>{
    try{
        
        const {id,email}=req.user;
        const {productid}=req.body;
        const prodel=await Product.findByIdAndDelete(productid);
        await User.findByIdAndUpdate(id,
            {$pull:{products:productid}}
        )
        
        await Category.findByIdAndUpdate(prodel.category,
            {$pull:{products:productid}}
        )

        res.json({
            success:true,
            message:"Product deleted successfully",
        })



}
catch(err){
    return res.json({
        success:false,
        message:err.message,
    })
}

}


exports.getproductsviacategory=async (req,res)=>{
    try{
        const {categoryid}=req.body;
        if(!categoryid){
            return res.json({
                success:false,
                message:"All fields are required"
            })
        }

        const products=await Category.findById(categoryid).populate("products");

        res.json({
            success:true,
            message:"products via category fetched successfully",
            data:products
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}



exports.getproductpagedetails=async (req,res)=>{
    try{
        const {productid}=req.body;
        if(!productid){
            return res.json({
                success:false,
                message:"Product id is required"
            })
        }

        const productpage=await Product.findById(productid).populate("category").populate("owner");
        res.json({
            success:true,
            message:"Product details fetched successfully",
            data:productpage
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}

exports.getallproduct=async (req,res)=>{
    try{
        const products=await Product.find().populate("owner").populate("category");
        res.json({
            success:true,
            message:"All Products fetched successfully",
            data:products
        })
    }
    catch(err){
        return res.json({
            success:false,
            message:err.message
        })
    }
}