import mongoose from 'mongoose';

const feedsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    feedtext: { type: String, required: true},
    PostedTime: {type: String, required: true},
    comments: [{comment: String, userCommentedId: String}],
    userId: { type: String, required: true}
});

const feedsModel = mongoose.model('feeds', feedsSchema);

export default feedsModel;