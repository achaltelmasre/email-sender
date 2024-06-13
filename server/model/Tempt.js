import mongoose from 'mongoose';

const temporaryUserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    address: String,
    gender: String,
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1d' // Automatically delete after 1 day
    }
});

const TemporaryUser = mongoose.model('TemporaryUser', temporaryUserSchema);

export default TemporaryUser;
