import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendVerifyMail = async (name, email, tempUserId) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'gmail',
            port: 465,
            secure: true,
            auth: {
                user: 'achaltelmasre@gmail.com',
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: email,
            to:  process.env.EMAIL_USER,
            subject: 'Verification Mail',
            html: `
                <p>Hi!<br/> Can you allow <u><b>${name}</b></u> (${email}) to register their data?</p>
                <button type="button" style="padding: 10px 20px; background-color: green; color: white; border: none; cursor: pointer;" onchange="handleAllow('${tempUserId}')">Allow</button>
                <button type="button" style="padding: 10px 20px; background-color: red; color: white; border: none; cursor: pointer;" onchange="handleDeny('${tempUserId}')">Deny</button>

                <script>
                    async function handleAllow(tempUserId) {
                        try {
                            const response = await fetch('http://localhost:3000/user/respond/' + tempUserId + '?action=allow', {
                                method: 'POST'
                            });
                            const result = await response.text();
                            alert(result);
                        } catch (error) {
                            console.error('Error:', error);
                            alert('Error processing request. Please try again later.');
                        }
                    }

                    async function handleDeny(tempUserId) {
                        try {
                            const response = await fetch('http://localhost:3000/user/respond/' + tempUserId + '?action=deny', {
                                method: 'POST'
                            });
                            const result = await response.text();
                            alert(result);
                        } catch (error) {
                            console.error('Error:', error);
                            alert('Error processing request. Please try again later.');
                        }
                    }
                </script>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");

    } catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
};

export default sendVerifyMail;
