import mongoose from "mongoose";

const promotionSchema = new mongoose.Schema({
    title: String,
    description: String,
    promoterId: {type: mongoose.Schema.ObjectId},
    storeId: {type: mongoose.Schema.ObjectId},
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