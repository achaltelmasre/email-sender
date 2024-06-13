import User from "../model/User.js";
import nodemailer from 'nodemailer';
import sendVerifyMail from "./sendMail.js";
import dotenv from 'dotenv';
dotenv.config();

// For sending mail
// const sendVerifyMail = async (name, email, user_id) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             host: 'smtp.gmail.com',
//             service: 'gmail',
//             port: 465,
//             secure: false,
//             auth: {
//                 user: 'achaltelmasre@gmail.com',
//                 pass: 'enmlojwlueevmzym' 
//             }
//         });

//         const verificationLink = `http://localhost:3000/user/verify/${user_id}`;
//         const denyLink = `http://localhost:3000/user/deny/${user_id}`;

//         const mailOptions = {
//             from: `${name}`,
//             to: 'achaltelmasre@gmail.com',
//             subject: 'Verification Mail',
//             html: `<p>Hi! <br/> Can you allow <u><b>${name}</b></u> ${email} to register their data?</p>
//                    <a href="${verificationLink}"><button>Allow</button></a>
//                    <a href="${denyLink}"><button>Deny</button></a>`
//         };

//         transporter.sendMail(mailOptions, function(error, info) {
//             if (error) {
//                 console.log(error);
//             } else {
//                 console.log("Email has been sent: ", info.response);
//             }
//         });

//         console.log("Email sent successfully");

//     } catch (error) {
//         console.log("Email not sent");
//         console.log(error);
//     }
// };

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
        gender: gender
    });

    try {
        await sendVerifyMail(name, email, user._id); 
        const savedUser = await user.save();
       
        res.json({
            success: true,
            data: savedUser,
            message: "User created successfully"
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
};

const varifymail = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.verified = true;
        await user.save();
        res.json({ success: true, message: 'User verified successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Verification failed' });
    }
};

const denymail = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        await user.remove();
        res.json({ success: true, message: 'User denied and removed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Denial failed' });
    }
}


export { storedata ,varifymail , denymail};
