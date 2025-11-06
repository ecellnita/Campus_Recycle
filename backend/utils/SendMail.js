const nodemailer=require("nodemailer");
require("dotenv").config();

exports.mailsender=async (email,title,body)=>{
    try{
        let transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587, // or 465 for SSL
            secure: false, // true for 465, false for other ports
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
            // Add timeout configurations
            connectionTimeout: 60000, // 60 seconds
            greetingTimeout: 30000,   // 30 seconds
            socketTimeout: 60000,     // 60 seconds
        })

        // Add timeout wrapper for the email sending
        const info = await Promise.race([
            transporter.sendMail({
                from: `"NITASPACE" <${process.env.MAIL_USER}>`,
                to: `${email}`,
                subject: `${title}`,
                html: `${body}`
            }),
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email sending timeout')), 30000)
            )
        ]);
        
        console.log("Email sent successfully:", info.messageId);
        return info;
    }
    catch(err){
        console.log("Cannot Send email for Verification");
        console.log(err.message);
        throw err; // Re-throw the error so it can be handled upstream
    }
}