import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
    owner: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: String,
    desc: String,
})

const Store = mongoose.model('store', storeSchema)

Store.syncIndexes().catch((err)=> {throw new Error(err)});

export default Store;