import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    ownerId: {type: mongoose.Types.ObjectId, required: true},
    name: {type: String, unique: true, required: true},
    upvotes: {type: Number, default: 0},
    description: String,
    items: {type: [mongoose.Types.ObjectId], ref: 'Item'}
}, {timestamps: true})

const Store = mongoose.model('Store', storeSchema)

Store.syncIndexes().catch((err)=> {throw new Error(err)});

export default Store;