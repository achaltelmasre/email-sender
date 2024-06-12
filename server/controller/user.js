
import User from "../model/User.js";
import { sendMail } from "./sendMail.js";


//for send mail
const sendVerifyMail = async(name, email, user_id) => {
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
           
        const mailOptions = {
            from: process.env.USER,
            to: email,
            subject: 'for verification mail ',
             html: `<p> Hii ! <br/> can you allow  ${name} to register their data </p> ,
                     <a href=""><button> Allow </button/> <a/>, <button> Deny <button/>`
        }

         transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error)
            }
            else{
                console.log("Email has been sent:- ", info.responder);
            }
         })
    
          console.log("Email send successfully");
    
      }
      catch (error){
         console.log("email not send");
         console.log(error);
      }
}

const storedata = async (req, res) => {
    const {
        name,
        email,
        password,
        mobile,
        address, 
         gender
    } = req.body;

    const user = new User({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        address: address,
        gender:gender
    })

    try{
        sendVerifyMail(req.body.name, req.body.email, userData._id);

        const savedUser = await user.save();
   
        res.json({
            success: true,
            data: savedUser,
            message: " User created successfully "
        })
      }
      catch(e){
       res.json({
           success: false,
           message: e.message
       }) 
    }
};

export {storedata}