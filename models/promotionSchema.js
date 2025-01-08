import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    title: String,
    description: String,
    promoter: {type: mongoose.Schema.ObjectId},
    store: {type: mongoose.Schema.ObjectId},
    imageUrl: String,
    phoneNo: String,
    socials:{
        whatsappNo: String,
        facebook: String,
        twitter: String,
        reddit: String,
        qoura: String,
    },
    website: String
})

const Promotion = mongoose.model('Promotion', promotionSchema)