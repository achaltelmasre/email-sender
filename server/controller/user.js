import User from "../model/User.js";
import TemporaryUser from "../model/Tempt.js";
import sendVerifyMail from "./sendMail.js";

const storedata = async (req, res) => {
    const { name, email, password, mobile, address, gender } = req.body;

    const tempUser = new TemporaryUser({
        name,
        email,
        password,
        mobile,
        address,
        gender
    });

    try {
        const savedTempUser = await tempUser.save();
        await sendVerifyMail(name, email, savedTempUser._id);

        res.json({
            success: true,
            message: "Please wait for some minutes for verification."
        });
    } catch (e) {
        res.json({
            success: false,
            message: e.message
        });
    }
};

const respond = async (req, res) => {
    const { tempUserId } = req.params;
    const { action } = req.query;

    try {
        const tempUser = await TemporaryUser.findById(tempUserId);
        if (!tempUser) {
            return res.status(404).json({ success: false, message: 'Temporary user not found' });
        }

        if (action === 'allow') {
            const user = new User({
                name: tempUser.name,
                email: tempUser.email,
                password: tempUser.password,
                mobile: tempUser.mobile,
                address: tempUser.address,
                gender: tempUser.gender,
                verified: true
            });

            await user.save();
            await TemporaryUser.findByIdAndRemove(tempUserId);

            return res.send('<script>alert("User verified and data stored successfully."); window.location.href = "http://localhost:3000";</script>');
        } else if (action === 'deny') {
            await TemporaryUser.findByIdAndRemove(tempUserId);
            return res.send('<script>alert("Permission denied and data removed successfully."); window.location.href = "http://localhost:3000";</script>');
        } else {
            return res.status(400).json({ success: false, message: 'Invalid action' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request processing failed' });
    }
};

const getStatus = async (req, res) => {
    const { tempUserId } = req.params;

    try {
        const tempUser = await TemporaryUser.findById(tempUserId);
        if (!tempUser) {
            const user = await User.findOne({ tempUserId });
            if (user) {
                return res.json({ status: 'verified' });
            } else {
                return res.json({ status: 'denied' });
            }
        }
        res.json({ status: 'pending' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Request processing failed' });
    }
};


export { storedata, respond, getStatus };
