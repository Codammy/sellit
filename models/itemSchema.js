import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    storeId: {type: mongoose.Types.ObjectId, ref: 'Store', required: true},
    currency: {type: String, enum: ['NGN', 'USD'], default: 'NGN'},
    price: {type: Number, default: 0},
    description: String,
    imageUrl: String,
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)

Item.syncIndexes().catch((err)=> {throw new Error(err)});

export default Item;