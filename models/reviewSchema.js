import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerId: {type: mongoose.Types.ObjectId, ref: 'User'},
    comment: {type: String, unique: true, required: true},
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema)

Review.syncIndexes().catch((err)=> {throw new Error(err)});

export default Review;
