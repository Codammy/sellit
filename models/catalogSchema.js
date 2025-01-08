import mongoose from "mongoose";

const catalogSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: 'User'},
    items: {type: [mongoose.Types.ObjectId], ref: 'Item', unique: true}
}, {timestamps: true})

const Catalog = mongoose.model('Catalog', catalogSchema)

Catalog.syncIndexes().catch((err)=> {throw new Error(err)});

export default Catalog;