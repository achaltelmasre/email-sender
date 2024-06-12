import { text } from "express";
import nodemailer from "nodemailer";


const sendMail = async (req, res) => {

  try{
    const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service:process.env.SERVICE,
        port: Number(process.env.EMAIL_PORT),
        secure: Boolean(process.env.SECURE),
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        }
    });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text
    
      });

      console.log("Email send successfully");

  }
  catch (error){
     console.log("email not send");
     console.log(error);
  }
  

    const info = await transporter.sendMail({
        from: '"jitendra" <jitendra@gmail.com>', // sender address
        to: "achaltelmasre@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });
    
      console.log("Message sent: %s", info.messageId);
       res.json(info);

        res.send("I am sending mail");
    }

   


export {sendMail}