import Review from '../models/reviewSchema.js'

export async function getAllReviews(req, res, next) {
    try {
        const reviews = await Review.find();
        return res.json({data: reviews})
    } catch(err) {
       return next(err);
    }
}

export async function getReviewById(req, res, next) {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({err: "Review not found"})
        return res.json({data: review})
    } catch(err) {
       return next(err);
    }
}

export async function createReview(req, res, next) {
    const review = new Review({...req.body, reviewerId: req.user.id});
    if (review.storeId && review.itemId) return res.status(400).json({error: "Item or store can only be reviewed at a time"})
    if (review.on === 'store' && !review.storeId) return res.status(400).json({error: "storeId required on store review"})
    if (review.on === 'item' && !review.itemId) return res.status(400).json({error: "itemid required on item review"})
    try {
        await review.save();
        return res.json({data: review})
    } catch(err) {
        err.status =  (err._message === 'Review validation failed'  || err.code === 11000) ? 400 : 500;
        err.message = err.code === 11000 ? `${JSON.stringify(err.keyValue)} already exist` : (err._message || err.message)
        return next(err);
    }
}

export async function updateReview(req, res, next) {
    try {
        const review = await Review.findById(req.params.id)
        if (!review) return res.status(404).json({err: "Review not found"})
            await Review.updateOne({_id: req.params.id}, {...req.body})
        return res.json({success: true, message: "Review updated successfully"})
    } catch(err) {
        return next(err);
    }
}

export async function deleteReview(req, res, next) {
    try {
        const review = await Review.findById(req.params.id)
        if (!review) return res.status(404).json({err: "Review not found"})
            await review.deleteOne({_id: req.params.id})
        return res.json({success: true, message: "Review deleted successfully"})
    } catch(err) {
        return next(err);
    }
}