import nodemailer from "nodemailer";


const sendMail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'achaltelmasre@gmail.com',
            pass: 'enmlojwlueevmzym'
        }
    });

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