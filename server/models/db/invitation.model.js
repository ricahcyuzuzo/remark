import mongoose from 'mongoose';

const invitaionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    toPersonPhoneNumber: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    restaurant: { type: String, required: true },
    status: { type: String, required: true }
});

const invitationsModel = mongoose.model('invitations', invitaionSchema);

export default invitationsModel;
