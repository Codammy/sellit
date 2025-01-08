import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId},
    name: {type: String, unique: true, required: true},
    upvotes: Number,
    description: String,
})

const Store = mongoose.model('Store', storeSchema)

Store.syncIndexes().catch((err)=> {throw new Error(err)});

export default Store;