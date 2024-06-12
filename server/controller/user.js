
import User from "../model/User.js";

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