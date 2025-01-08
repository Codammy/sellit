import mongoose, { models } from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    store: {type: mongoose.Types.ObjectId, ref: 'Store', required: true},
    currency: {type: String, enum: ['NGN', 'USD'], default: 'NGN'},
    price: Number,
    desc: String,
    image_url: String
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)

Item.syncIndexes().catch((err)=> {throw new Error(err)});

export default Item;