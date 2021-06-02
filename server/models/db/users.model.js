import mongoose from 'mongoose';

const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String },
    phoneNumber: { type: String, required: true },
    password: {type: String, required: true},
    gender: {type: String, required: true},
    role: { type: String, required: true }
});

const usersModel = mongoose.model('users', usersSchema);

export default usersModel;
