import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendVerifyMail = async (name, email, user_id) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: false,
            auth: {
                user: 'achaltelmasre@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        const verificationLink = `http://localhost:3000/user/verify/${user_id}`;
        const denyLink = `http://localhost:3000/user/deny/${user_id}`;

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'achaltelmasre@gmail.com',  // Replace with the email where you want to receive verification requests
            subject: 'Verification Mail',
            html: `<p>Hi! <br/> Can you allow <u><b>${name}</b></u> (${email}) to register their data?</p>
                   <a href="${verificationLink}"><button>Allow</button></a>
                   <a href="${denyLink}"><button>Deny</button></a>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Email has been sent: ", info.response);
            }
        });

        console.log("Email sent successfully");
        // console.log()

    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
};

export default sendVerifyMail;
