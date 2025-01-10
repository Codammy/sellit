import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    reviewerId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
    comment: {type: String, required: true},
    on: {type: String, enum: ['store', 'item'], required: true},
    itemId: {type: mongoose.Types.ObjectId, ref: 'Item'},
    storeId: {type: mongoose.Types.ObjectId, ref: 'Store'},
}, {timestamps: true});

const Review = mongoose.model('Review', reviewSchema)

Review.syncIndexes().catch((err)=> {throw new Error(err)});

export default Review;
